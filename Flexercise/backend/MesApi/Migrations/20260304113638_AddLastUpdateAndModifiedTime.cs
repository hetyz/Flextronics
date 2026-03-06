using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MesApi.Migrations
{
    /// <inheritdoc />
    public partial class AddLastUpdateAndModifiedTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LastUpdate",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedTime",
                table: "Products",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Created", "LastUpdate", "ModifiedTime" },
                values: new object[] { new DateTime(2026, 3, 1, 17, 36, 40, 406, DateTimeKind.Local).AddTicks(5541), "", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Created", "LastUpdate", "ModifiedTime" },
                values: new object[] { new DateTime(2026, 3, 3, 7, 4, 7, 406, DateTimeKind.Local).AddTicks(5541), "", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Created", "LastUpdate", "ModifiedTime" },
                values: new object[] { new DateTime(2026, 3, 1, 21, 7, 9, 406, DateTimeKind.Local).AddTicks(5541), "", null });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Created", "LastUpdate", "ModifiedTime" },
                values: new object[] { new DateTime(2026, 3, 3, 0, 40, 12, 406, DateTimeKind.Local).AddTicks(5541), "", null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUpdate",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ModifiedTime",
                table: "Products");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Created",
                value: new DateTime(2026, 1, 4, 20, 24, 55, 510, DateTimeKind.Local).AddTicks(4518));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "Created",
                value: new DateTime(2026, 1, 5, 0, 9, 8, 510, DateTimeKind.Local).AddTicks(4518));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "Created",
                value: new DateTime(2026, 1, 4, 8, 50, 36, 510, DateTimeKind.Local).AddTicks(4518));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "Created",
                value: new DateTime(2026, 1, 1, 18, 47, 38, 510, DateTimeKind.Local).AddTicks(4518));
        }
    }
}
