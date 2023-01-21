namespace ShapesProject
{

    internal class Program
    {
        private static void Main(string[] args)
        {
            InputHandler inputHandler = new InputHandler();

            bool test = inputHandler.GetRunTests();
            if (test)
            {
                var Tests = new Tests();
                Tests.RunTests();
                System.Environment.Exit(0);
            }

            FileType fileType = inputHandler.GetFileType();

            string FilePath = inputHandler.GetFilePath(fileType);

            IDeserializer deserializer = fileType switch
            {
                FileType.Json => new JsonDeserializer(),
                FileType.Xml => new XmlDeserializer(),
                _ => throw new System.Exception("Invalid file type")
            };

            var DataStore = new ShapesDataStore(deserializer);

            DataStore.DeserializeFile(FilePath);

            while (true)
            {
                Actions action = inputHandler.GetAction();

                if (action == Actions.Exit) break;
                if (action == Actions.Display)
                {
                    DataStore.DisplayStats();
                    continue;
                }
                if (action == Actions.Write)
                {
                    string NewFilePath = inputHandler.GetNewFilePath();
                    DataStore.CreateCsvFile(NewFilePath);
                    continue;
                }
            }
        }
    }
}
