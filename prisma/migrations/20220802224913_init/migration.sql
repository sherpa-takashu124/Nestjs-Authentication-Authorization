-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "roleAndPermission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "permission" (
    "id" SERIAL NOT NULL,
    "permission_slug" TEXT NOT NULL,
    "permission" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_id_key" ON "role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "role_role_key" ON "role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "roleAndPermission_roleId_permissionId_key" ON "roleAndPermission"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "permission_id_key" ON "permission"("id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roleAndPermission" ADD CONSTRAINT "roleAndPermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roleAndPermission" ADD CONSTRAINT "roleAndPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
