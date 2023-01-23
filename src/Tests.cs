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

            var jsonDeserializeTest = new TestDeserializeJson();
            jsonDeserializeTest.RunTests();

        }
    }
}