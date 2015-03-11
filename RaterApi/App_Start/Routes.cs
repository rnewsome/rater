using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Routing;


namespace RaterApi
{
    public class Routes
    {
        public static void RegisterRoutes(RouteCollection routes) {
            routes.Ignore("{resource}.axd/{*pathInfo}");

            // API routes
            routes.MapHttpRoute(
                name: "QRAPI",
                routeTemplate: "api/{controller}"
            );
        }
    }
}