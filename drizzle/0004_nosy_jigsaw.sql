ALTER TABLE "elaborateCompanies" ALTER COLUMN "genpage" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "elaborateCompanies" ALTER COLUMN "genpage" SET DEFAULT '{"flaws":"flaws","process":"process","reasons":"reasons","summary":"summary","resources":"resources"}'::json;