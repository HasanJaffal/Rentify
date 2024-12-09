using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class RemovingPrimaryImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_Images_PrimaryImageId",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_PrimaryImageId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "PrimaryImageId",
                table: "Listings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PrimaryImageId",
                table: "Listings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Listings_PrimaryImageId",
                table: "Listings",
                column: "PrimaryImageId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_Images_PrimaryImageId",
                table: "Listings",
                column: "PrimaryImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
