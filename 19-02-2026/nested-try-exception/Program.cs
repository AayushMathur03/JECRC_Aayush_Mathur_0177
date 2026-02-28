using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace CustomExceptionExampleCode
{
    class MyException : Exception
    {
        public MyException(string Message ): base(Message){}
        public MyException(){}

        public MyException(string Message, Exception inner): base(Message,inner){}
    }

    class Program
    {
        static void Main(string[] args)
        {
            int a =50;
            int b =10;
            int k = a/b;

            try
            {
                if (k < 10)
                {
                    throw new MyException("my value");

                }
            }
            catch(MyException e)
            {
                Console.WriteLine("Caught My exception");
                Console.WriteLine(e.Message);
            }
            Console.Read();
        }
    }
}