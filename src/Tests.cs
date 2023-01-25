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
            // var areaTest = new TestAreas();
            // areaTest.RunTests();

            var jsonDeserializer = new JsonDeserializer("./src/tests/testFiles/testFile1.json");
            var xmlDeserializer = new XmlDeserializer("./src/tests/testFiles/testFile1.xml");

            // var jsonDeserializeTest = new TestDeserialize(jsonDeserializer);
            var xmlDeserializeTest = new TestDeserialize(xmlDeserializer);


            // jsonDeserializeTest.RunTests();
            xmlDeserializeTest.RunTests();


            System.Console.WriteLine("\n***All Tests Passed with no errors.***\n\n");

        }
    }
}