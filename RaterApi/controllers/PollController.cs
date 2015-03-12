using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

using System.Collections.Specialized;
using System.IO;

using System.Net.Http.Formatting;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace RaterApi
{
    public class Poll
    {
        public List<Question> qs;

        public string date;
        public string comments;
        public string clientid;
        public string employeeid;
    }
    public class Question
    {
        public int Id;
        public string value;
    }

    public class PollController : ApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Poll json)
        {
            try
            {
                System.Diagnostics.Debugger.Break();

                return new HttpResponseMessage(HttpStatusCode.OK);
                //{
                //    Content = new ObjectContent<Poll>(poll, new JsonMediaTypeFormatter(), new MediaTypeHeaderValue("application/json"));
                //};
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}