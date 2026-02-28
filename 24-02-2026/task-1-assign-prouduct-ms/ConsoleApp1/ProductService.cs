using Microsoft.Data.SqlClient;

namespace ProductManagementSystem
{
    public class ProductService
    {
        string connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=ProductDB;Integrated Security=True";

        ProductModel prod = new ProductModel();

        
        public void InsertProduct()
        {
            Console.WriteLine("Enter Product Name:");
            prod.Name = Console.ReadLine();

            Console.WriteLine("Enter Category:");
            prod.Category = Console.ReadLine();

            Console.WriteLine("Enter Price:");
            prod.Price = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("In Stock? (true/false):");
            prod.InStock = Convert.ToBoolean(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "INSERT INTO Products(Name,Category,Price,InStock) " +
                           "VALUES(@Name,@Category,@Price,@InStock)";

            using SqlCommand cmd = new SqlCommand(query, conn);

            cmd.Parameters.AddWithValue("@Name", prod.Name);
            cmd.Parameters.AddWithValue("@Category", prod.Category);
            cmd.Parameters.AddWithValue("@Price", prod.Price);
            cmd.Parameters.AddWithValue("@InStock", prod.InStock);

            int rows = cmd.ExecuteNonQuery();

            Console.WriteLine(rows > 0 ?
                "Product Inserted Successfully" :
                "Insertion Failed");
        }

       
        public void ViewProducts()
        {
            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "SELECT * FROM Products";

            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                Console.WriteLine($"{reader["Id"]} | {reader["Name"]} | " +
                                  $"{reader["Category"]} | {reader["Price"]} | " +
                                  $"{reader["InStock"]}");
            }
        }

        
        public void SearchById()
        {
            Console.WriteLine("Enter Product ID:");
            int id = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "SELECT * FROM Products WHERE Id=@Id";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", id);

            using SqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                Console.WriteLine($"{reader["Id"]} | {reader["Name"]} | " +
                                  $"{reader["Category"]} | {reader["Price"]} | " +
                                  $"{reader["InStock"]}");
            }
            else
                Console.WriteLine("Product Not Found");
        }

        
        public void SearchByCategory()
        {
            Console.WriteLine("Enter Category:");
            string category = Console.ReadLine();

            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "SELECT * FROM Products WHERE Category=@Category";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Category", category);

            using SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                Console.WriteLine($"{reader["Id"]} | {reader["Name"]} | " +
                                  $"{reader["Category"]} | {reader["Price"]} | " +
                                  $"{reader["InStock"]}");
            }
        }

        
        public void UpdateProduct()
        {
            Console.WriteLine("Enter Product ID:");
            prod.Id = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter New Name:");
            prod.Name = Console.ReadLine();

            Console.WriteLine("Enter New Category:");
            prod.Category = Console.ReadLine();

            Console.WriteLine("Enter New Price:");
            prod.Price = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("In Stock? (true/false):");
            prod.InStock = Convert.ToBoolean(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "UPDATE Products SET Name=@Name, " +
                           "Category=@Category, Price=@Price, " +
                           "InStock=@InStock WHERE Id=@Id";

            using SqlCommand cmd = new SqlCommand(query, conn);

            cmd.Parameters.AddWithValue("@Id", prod.Id);
            cmd.Parameters.AddWithValue("@Name", prod.Name);
            cmd.Parameters.AddWithValue("@Category", prod.Category);
            cmd.Parameters.AddWithValue("@Price", prod.Price);
            cmd.Parameters.AddWithValue("@InStock", prod.InStock);

            int rows = cmd.ExecuteNonQuery();

            Console.WriteLine(rows > 0 ?
                "Product Updated Successfully" :
                "Product Not Found");
        }

        
        public void DeleteProduct()
        {
            Console.WriteLine("Enter Product ID:");
            int id = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "DELETE FROM Products WHERE Id=@Id";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", id);

            int rows = cmd.ExecuteNonQuery();

            Console.WriteLine(rows > 0 ?
                "Product Deleted Successfully" :
                "Product Not Found");
        }

       
        public void SortProducts()
        {
            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "SELECT * FROM Products ORDER BY Price";

            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                Console.WriteLine($"{reader["Id"]} | {reader["Name"]} | " +
                                  $"{reader["Category"]} | {reader["Price"]} | " +
                                  $"{reader["InStock"]}");
            }
        }
    }
}