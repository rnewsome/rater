using Newtonsoft.Json;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Routing;

namespace RaterApi
{

    public class WebApiApplication : System.Web.HttpApplication {
        protected void Application_Start() {
            GlobalConfiguration.Configuration.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
            
            foreach (MediaTypeFormatter mtf in GlobalConfiguration.Configuration.Formatters) {
                if (mtf.GetType() == typeof(JsonMediaTypeFormatter)) {
                    (mtf as JsonMediaTypeFormatter).SerializerSettings = new Newtonsoft.Json.JsonSerializerSettings() {
                        NullValueHandling = NullValueHandling.Include,
                        PreserveReferencesHandling = PreserveReferencesHandling.None,
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    };
                }
            }

            Routes.RegisterRoutes(RouteTable.Routes);
        }
    }
}