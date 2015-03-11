using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

using System.Drawing.Imaging;
using System.IO;

using Gma.QrCodeNet.Encoding;
using Gma.QrCodeNet.Encoding.Windows.Render;

namespace RaterApi
{
    public class QRController : ApiController
    {
        // GET api/<controller>
        public HttpResponseMessage Get() {

            ErrorCorrectionLevel ecl = ErrorCorrectionLevel.H;
            QuietZoneModules quietZones = QuietZoneModules.Two;
            int ModuleSize = 2;

            QrEncoder qrEncoder = new QrEncoder(ecl);
            QrCode qrCode = qrEncoder.Encode("http://www.google.com");

            using (var ms = new MemoryStream()) {

                var render = new GraphicsRenderer(new FixedModuleSize(ModuleSize, quietZones));
                render.WriteToStream(qrCode.Matrix, ImageFormat.Png, ms);

                //HttpResponseMessage response = new HttpResponseMessage { Content = new StreamContent(ms) };
                //response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
                //response.Content.Headers.ContentLength = (int)ms.Length;

                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new ByteArrayContent(ms.ToArray());
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
                response.Content.Headers.ContentLength = (int)ms.Length;

                return response;
            }
        }
    }
}