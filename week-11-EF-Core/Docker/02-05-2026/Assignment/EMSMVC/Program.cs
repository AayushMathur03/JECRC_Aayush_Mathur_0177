var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

// ADD THIS
builder.Services.AddHttpClient<EmployeeService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();