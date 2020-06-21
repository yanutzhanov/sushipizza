using Microsoft.EntityFrameworkCore.Migrations;

namespace Entites.Migrations
{
    public partial class UserDiscount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "user",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalSpend",
                table: "user",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "user");

            migrationBuilder.DropColumn(
                name: "TotalSpend",
                table: "user");
        }
    }
}
