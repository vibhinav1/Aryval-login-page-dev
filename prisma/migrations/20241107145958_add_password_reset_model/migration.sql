-- DropIndex
DROP INDEX "PasswordReset_email_idx";

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_email_fkey" FOREIGN KEY ("email") REFERENCES "Account"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
