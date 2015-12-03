using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(demo_salesapp.Startup))]
namespace demo_salesapp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
