using Microsoft.EntityFrameworkCore.Migrations;

namespace Coding_challenge_BE.Migrations
{
    public partial class initialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(unicode: false, maxLength: 255, nullable: true),
                    LastName = table.Column<string>(unicode: false, maxLength: 255, nullable: true),
                    Email = table.Column<string>(unicode: false, maxLength: 255, nullable: true),
                    Password = table.Column<string>(unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "Password" },
                values: new object[,]
                {
                    { 1, "soufian.chaoui@gmail.com", "soufiane", "chaoui", "123" },
                    { 2, "soufian.chaoui2@gmail.com", "soufiane2", "chaoui2", "123" },
                    { 3, "soufian.chaoui3@gmail.com", "soufiane3", "chaoui3", "123" },
                    { 4, "soufian.chaoui4@gmail.com", "soufiane4", "chaoui4", "123" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
