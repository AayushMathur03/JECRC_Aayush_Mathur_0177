using System.Collections;

namespace ArrayListDemo
{
    class UsingArrayList
    {
        static void Main(string[] args){
            ArrayList listdata = new ArrayList();
            listdata.Add(100);
            listdata.Add(102);
            listdata.Add(103);
            listdata.Add(104);
            // listdata.Add("Dotnet");

            foreach(object i in listdata)
            {
                Console.WriteLine(i);
            }

            ArrayList listdata2 = new ArrayList();
            listdata.Add(200);
            listdata.Add(202);
            listdata.Add(203);
            listdata.Add(204);
            listdata.Add("Java");

            foreach(object i in listdata2)
            {
                Console.WriteLine(i);
            }

            listdata.AddRange(listdata2);

            foreach (object i in listdata)
            {
                Console.WriteLine(i);
            }


            //Trim() function.
            string order = "            Order#1001 | Laptop | Dell | 75000             ";

            Console.WriteLine(order);
            string trimOrder = order.Trim();
            Console.WriteLine(trimOrder);

            Console.WriteLine(order.Length);
            Console.WriteLine(trimOrder.Length);

            //
            string[] parts = trimOrder.Split('|');
            Console.WriteLine("After Split.");

            foreach(var item in parts)
            {
                Console.Write(item.Trim());
            }



        }
    }
}