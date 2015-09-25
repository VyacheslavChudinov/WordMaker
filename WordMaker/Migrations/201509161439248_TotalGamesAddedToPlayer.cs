namespace WordMaker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TotalGamesAddedToPlayer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "TotalGames", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "TotalGames");
        }
    }
}
