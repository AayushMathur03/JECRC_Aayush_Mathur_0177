using System.Web;
using System.Web.Mvc;

namespace WebApplication1_.NETFramework_TouchUp
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
