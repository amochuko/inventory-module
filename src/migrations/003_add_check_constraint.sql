-- Add CHECK constraints to enforce non-empty strings
ALTER TABLE inventory.categories
ADD CONSTRAINT categories_name_non_empty CHECK(char_length(trim(name)) > 1),
    ADD CONSTRAINT categories_abbrev_code_non_empty CHECK(char_length(trim(abbrev_code)) > 1);
ALTER TABLE inventory.suppliers
ADD CONSTRAINT suppliers_name_non_empty CHECK(char_length(trim(name)) > 1),
    ADD CONSTRAINT suppliers_address_non_empty CHECK(char_length(trim(address)) > 1),
    ADD CONSTRAINT suppliers_email_non_empty CHECK(char_length(trim(email)) > 1),
    ADD CONSTRAINT suppliers_phone_non_empty CHECK(char_length(trim(phone)) > 1),
    ADD CONSTRAINT suppliers_description_non_empty CHECK(char_length(trim(description)) > 1);
