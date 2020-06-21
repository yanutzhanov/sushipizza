using Microsoft.EntityFrameworkCore.Migrations;

namespace Entites.Migrations
{
    public partial class ProductImgs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImgPath",
                table: "product",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Portion",
                table: "product",
                maxLength: 20,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgPath",
                table: "product");

            migrationBuilder.DropColumn(
                name: "Portion",
                table: "product");
        }
    }
}
