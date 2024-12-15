using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backebd.Migrations
{
    /// <inheritdoc />
    public partial class Change : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "todoLists",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ItemName",
                table: "todoLists",
                newName: "item");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "todoLists",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "item",
                table: "todoLists",
                newName: "ItemName");
        }
    }
}
