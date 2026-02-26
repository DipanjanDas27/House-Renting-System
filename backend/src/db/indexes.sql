CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_owner ON properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_rooms ON properties(available_rooms);

CREATE INDEX IF NOT EXISTS idx_rental_tenant ON rental_agreements(tenant_id);
CREATE INDEX IF NOT EXISTS idx_rental_owner ON rental_agreements(owner_id);
CREATE INDEX IF NOT EXISTS idx_rental_property ON rental_agreements(property_id);
CREATE INDEX IF NOT EXISTS idx_rental_dates ON rental_agreements(property_id, start_date, end_date);

CREATE INDEX IF NOT EXISTS idx_payment_tenant ON payments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_payment_owner ON payments(owner_id);
CREATE INDEX IF NOT EXISTS idx_payment_agreement ON payments(agreement_id);