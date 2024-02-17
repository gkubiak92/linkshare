CREATE TABLE IF NOT EXISTS "votesToLinkEntries" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"linkEntryId" integer NOT NULL,
	"vote" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votesToLinkEntries" ADD CONSTRAINT "votesToLinkEntries_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "votesToLinkEntries" ADD CONSTRAINT "votesToLinkEntries_linkEntryId_linkEntries_id_fk" FOREIGN KEY ("linkEntryId") REFERENCES "linkEntries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
