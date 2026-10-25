ALTER TABLE cours_arabe_inscriptions ADD COLUMN stripe_session_id TEXT;
ALTER TABLE cours_arabe_inscriptions ADD COLUMN stripe_payment_intent_id TEXT;
ALTER TABLE cours_arabe_inscriptions ADD COLUMN payment_status TEXT DEFAULT 'pending' CHECK(payment_status IN ('pending', 'processing', 'succeeded', 'failed', 'cancelled'));
ALTER TABLE cours_arabe_inscriptions ADD COLUMN payment_date DATETIME;

ALTER TABLE stages_intensifs_inscriptions ADD COLUMN stripe_session_id TEXT;
ALTER TABLE stages_intensifs_inscriptions ADD COLUMN stripe_payment_intent_id TEXT;
ALTER TABLE stages_intensifs_inscriptions ADD COLUMN payment_status TEXT DEFAULT 'pending' CHECK(payment_status IN ('pending', 'processing', 'succeeded', 'failed', 'cancelled'));
ALTER TABLE stages_intensifs_inscriptions ADD COLUMN payment_date DATETIME;

CREATE INDEX IF NOT EXISTS idx_cours_stripe_session ON cours_arabe_inscriptions(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_stages_stripe_session ON stages_intensifs_inscriptions(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_cours_payment_status ON cours_arabe_inscriptions(payment_status);
CREATE INDEX IF NOT EXISTS idx_stages_payment_status ON stages_intensifs_inscriptions(payment_status);
