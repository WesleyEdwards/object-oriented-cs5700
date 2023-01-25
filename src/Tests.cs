namespace ShapesProject
{
    interface ITest
    {
        void RunTests();
    }
    internal class Tests
    {
        public static void RunTests()
        {
            var jsonDeserializer = new JsonDeserializer("./src/tests/testFiles/testFile1.json");
            var xmlDeserializer = new XmlDeserializer("./src/tests/testFiles/testFile1.xml");

            var jsonTest = new TestDeserialize(jsonDeserializer);
            var xmlTest = new TestDeserialize(xmlDeserializer);

            System.Console.WriteLine("\n***Running Tests***\n");

            System.Console.WriteLine("\tTesting Deserialization of Json File");
            jsonTest.RunTests();
            System.Console.WriteLine("\tTesting Deserialization of Xml File");
            xmlTest.RunTests();

            System.Console.WriteLine("\n***All Tests Passed with no errors.***\n\n");

        }
    }
}