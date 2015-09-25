namespace WordMaker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ScoreAddedToPlayer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Score", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Score");
        }
    }
}
