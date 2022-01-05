CREATE TABLE List(
ID INT IDENTITY(1,1) NOT NULL,
ListCode VARCHAR(25) NOT NULL,
ListName VARCHAR(25) NOT NULL
)
GO
ALTER TABLE List
ADD CONSTRAINT PK_List PRIMARY KEY (ID);
GO
CREATE TABLE ListValues(
ID INT IDENTITY(1,1) NOT NULL,
ListId INT,
MasterCode VARCHAR(25) NOT NULL,
Name VARCHAR(25) NOT NULL
)
GO
ALTER TABLE ListValues
ADD CONSTRAINT PK_ListValues PRIMARY KEY (ID);
GO
ALTER TABLE ListValues
ADD CONSTRAINT ListValues_FK_List FOREIGN KEY (ListId) REFERENCES List(ID);
/*
list and values explain:

list:
1 - GN - Gender
2 - BG - Blood Group
3 - UOM - Unit Of Measurement

list values:
1 - 1 - M - Male
2 - 1 - F - Female
3 - 1 - T - TransGender
4 - 2 - B+ - B positive
5 - 2 - O+ - O Positive
6 - 3 - U - Units
*/
GO
CREATE TABLE DonorDetails(
ID INT NOT NULL IDENTITY(1,1),
FirstName VARCHAR(50) NOT NULL,
LastName VARCHAR(50) NOT NULL,
GenderId INT,
BloodGroupId INT,
DOB DATE NULL,
MobileNumber NUMERIC(10,0),
IsPhsicallyFit BIT,
IsActive BIT,
LastDonatedDate DATE
);
GO
--define primary
ALTER TABLE DonorDetails
ADD CONSTRAINT PK_DonorDetails PRIMARY KEY (ID);
GO
--define foreign keys
ALTER TABLE DonorDetails
ADD CONSTRAINT DonorDetails_FK_Gender FOREIGN KEY (GenderId) REFERENCES ListValues(ID);
GO
ALTER TABLE DonorDetails
ADD CONSTRAINT DonorDetails_FK_BloodGroup FOREIGN KEY (BloodGroupId) REFERENCES ListValues(ID);
GO
--Default Constraint
ALTER TABLE DonorDetails 
ADD  CONSTRAINT [donor_idf]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE DonorDetails 
ADD  CONSTRAINT [physical_idf]  DEFAULT ((1)) FOR [IsPhsicallyFit]
GO
CREATE TABLE CampDetails(
ID INT NOT NULL IDENTITY(1,1),
[Desc] NVARCHAR(255) NOT NULL,
StartDate DATE,
EndDate DATE
)
GO
ALTER TABLE CampDetails
ADD CONSTRAINT PK_CampDetails PRIMARY KEY (ID);
GO
CREATE TABLE CampCollections(
ID INT NOT NULL IDENTITY(1,1),
CampId INT,
DonorId INT NOT NULL,
RefNo NVARCHAR(100),
DonatedDate DATE,
Volume DECIMAL(10,2),
UomId INT
);
GO
ALTER TABLE CampCollections
ADD CONSTRAINT PK_CampCollections PRIMARY KEY (ID);
GO
ALTER TABLE CampCollections
ADD CONSTRAINT CampCollections_FK_Camp FOREIGN KEY (CampId) REFERENCES CampDetails(ID);
GO
ALTER TABLE CampCollections
ADD CONSTRAINT CampCollections_FK_Donors FOREIGN KEY (DonorId) REFERENCES DonorDetails(ID);
GO
ALTER TABLE CampCollections
ADD CONSTRAINT CampCollections_FK_UomId FOREIGN KEY (UomId) REFERENCES ListValues(ID);
GO
CREATE TABLE BloodBank(
ID INT NOT NULL IDENTITY(1,1),
BloodGroupId INT NOT NULL,
Volume Decimal(10,2),
UomId INT
);
GO
ALTER TABLE BloodBank
ADD CONSTRAINT PK_BloodBank PRIMARY KEY (ID);
GO
ALTER TABLE BloodBank
ADD CONSTRAINT BloodBank_FK_BloodGroupId FOREIGN KEY (BloodGroupId) REFERENCES ListValues(ID);

--update donor's blood donate date
CREATE TRIGGER [dbo].[tr_UpdateBloodDonatedDate]
   ON  [dbo].[CampCollections]
   AFTER INSERT
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    -- Insert statements for trigger here
	UPDATE d SET d.LastDonatedDate=CAST(i.DonatedDate AS DATE)
	FROM inserted i
	JOIN dbo.DonorDetails d ON i.DonorId=d.ID
END
GO

--get blood collections
CREATE VIEW [dbo].[vw_GetBloodCollections]
AS
SELECT d.ID DonorId
	,d.FirstName+' '+d.LastName DonorName
	,CAST(d.DOB AS DATE)DoB
	,DATEDIFF(YY,d.DOB,GETDATE())Age
	,g.Name Gender
	,d.MobileNumber
	,c.[Desc] CampName
	,CAST(cc.DonatedDate AS DATE)DonatedDate
	,CAST(cc.Volume AS NVARCHAR(3))+' '+u.Name Volume
FROM dbo.CampCollections cc
JOIN dbo.CampDetails c ON cc.CampId=c.ID
JOIN dbo.DonorDetails d ON cc.DonorId=d.ID
JOIN dbo.ListValues g ON d.GenderId=g.ID
JOIN dbo.ListValues u ON cc.UomId=u.ID
GO

--get blood stock
-- =============================================
-- Author:		Abhilash P
-- Create date: Sep 16, 2021
-- Description:	get blood stock details. ex: B+ - 2 units
-- =============================================
CREATE PROCEDURE [dbo].[usp_get_BloodStock]
AS
BEGIN
SELECT MAX(bg.Name) BloodGroup
	,CAST(SUM(b.Volume) AS NVARCHAR(5))+' '+MAX(u.Name) Volumes
FROM dbo.BloodBank b
JOIN dbo.ListValues bg ON b.BloodGroupId=bg.ID
JOIN dbo.ListValues u ON b.UomId=u.ID
GROUP BY b.BloodGroupId
END
GO

--get expected donation date
-- =============================================
-- Author:		Abhilash P
-- Create date: Sep 16, 2021
-- Description:	get expected donation date. (donated date has 6 months diff b/w one another, so find expected date from last donated date)
-- =============================================
CREATE FUNCTION [dbo].[fn_GetExpectedDonationDate]
(
	-- Add the parameters for the function here
	@donorName VARCHAR(50)
)
RETURNS DATE
AS
BEGIN
	-- Declare the return variable here
	DECLARE @result DATE;

	-- Add the T-SQL statements to compute the return value here
	SELECT @result= CAST(CASE WHEN d.LastDonatedDate>GETDATE() AND d.LastDonatedDate IS NOT NULL THEN d.LastDonatedDate ELSE DATEADD(MM,6,ISNULL(d.LastDonatedDate,GETDATE())) END AS DATE)
	FROM dbo.DonorDetails d
	WHERE d.FirstName+' '+d.LastName=@donorName

	-- Return the result of the function
	RETURN @result

END

--update stock
-- =============================================
-- Author:		Abhilash P
-- Create date: Sep 16, 2021
-- Description:	update stock based on collection
-- =============================================
CREATE PROCEDURE [dbo].[usp_trf_UpdateBloodStock]
AS
BEGIN
;WITH b AS(
		SELECT d.BloodGroupId
			,SUM(cc.Volume)Volume
			,MAX(cc.UomId)UomId
		FROM dbo.CampCollections cc
		JOIN dbo.DonorDetails d ON cc.DonorId=d.ID
		JOIN dbo.CampDetails c ON cc.CampId=c.ID
		WHERE CAST(c.StartDate AS DATE)<=CAST(GETDATE() AS DATE) AND CAST(c.EndDate AS DATE)>=CAST(GETDATE() AS DATE)
		GROUP BY d.BloodGroupId)
MERGE INTO dbo.BloodBank t
USING b
ON t.BloodGroupId=b.BloodGroupId

WHEN MATCHED THEN      
UPDATE      
SET  
	t.Volume=b.Volume
WHEN NOT MATCHED THEN      
INSERT ( 
		BloodGroupId,
		Volume,
		UomId)
VALUES
(
		b.BloodGroupId,b.Volume,b.UomId
);
END

/*
DROP TABLE BloodBank
DROP TABLE CampCollections
DROP TABLE CampDetails
DROP TABLE DonorDetails
DROP TABLE ListValues
DROP TABLE List
*/