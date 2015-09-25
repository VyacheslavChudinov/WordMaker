using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(WordMaker.Startup))]

namespace WordMaker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
