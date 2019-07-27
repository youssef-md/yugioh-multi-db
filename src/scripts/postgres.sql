DROP TABLE IF EXISTS CARD;

CREATE TABLE CARD (
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
  NAME TEXT NOT NULL,
  TYPES TEXT NOT NULL,
  ATTRIBUTE TEXT NOT NULL,
  LEVEL INT NOT NULL,
  ATK TEXT NOT NULL,
  DEF TEXT NOT NULL
);

-- CREATE
INSERT INTO CARD
  (NAME, TYPES, ATTRIBUTE, LEVEL, ATK, DEF)
VALUES
  ('Dark Magician', 'SPELLCASTER/NORMAL', 'DARK', 7, '2500', '2100'),
  ('Time Wizard', 'SPELLCASTER/EFFECT', 'LIGHT', 2, '500', '400'),
  ('Slifer The Sky Dragon', 'DIVINE-BEAST/EFFECT', 'DIVINE', 10, '?', '?'),
  ('Exodia The Forbidden One', 'MONSTER', 'DARK', 3, '1000', '1000');

-- READ
SELECT * FROM CARD WHERE NAME = 'Time Wizard';

-- UPDATE
UPDATE CARD SET
  NAME = 'Blue-Eyes White Dragon',
  TYPES = 'DRAGON/NORMAL',
  LEVEL = 8,
  ATK = '3000', DEF = '2500'
WHERE ID = 2;

-- DELETE
DELETE FROM CARD WHERE NAME LIKE '%Forbidden One%';