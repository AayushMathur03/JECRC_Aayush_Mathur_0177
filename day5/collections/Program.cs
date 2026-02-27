/*collections
5 types
genric ----> list, linkedlist,satck ,a queue and dictionary, they alsocalled type safety
non-generic --> arryalist, hash table, 
bit- based 
speacialezed
concurrent


genric and non generic interfaces
collections api.


system.collections namespace.


*/


using System;

namespace GenericDemo
{
    class UsingGenerics<T>
    {
        T obj;
        public UsingGenerics(T obj1)
        {
            this.obj = obj1;
        }

        public T Get()
        {
            return obj;
        }

        public void ShowType(T obj)
        {
            Console.WriteLine("Type of T is " + typeof(T)); //obj.GetType()
        }

    }

    class TestGenerics
    {
        public static void Main()
        {
            UsingGenerics<int> intGen = new UsingGenerics<int>(500);
            // Console.WriteLine(intGen.Get());
            intGen.ShowType(intGen.Get());

            UsingGenerics<string> strGen = new UsingGenerics<string>("Hello");
            // Console.WriteLine(strGen.Get());
            strGen.ShowType(strGen.Get());
        }
    }
}