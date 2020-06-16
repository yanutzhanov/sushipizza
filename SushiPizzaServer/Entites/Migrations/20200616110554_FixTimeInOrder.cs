using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Entites.Migrations
{
    public partial class FixTimeInOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderTime",
                table: "order",
                nullable: false,
                defaultValueSql: "GETDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2020, 6, 16, 17, 4, 16, 6, DateTimeKind.Local).AddTicks(655));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderTime",
                table: "order",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2020, 6, 16, 17, 4, 16, 6, DateTimeKind.Local).AddTicks(655),
                oldClrType: typeof(DateTime),
                oldDefaultValueSql: "GETDATE()");
        }
    }
}
