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
            OutputDest outPutDest = inputHandler.GetOutputDest();

            IDeserializer deserializer = fileType switch
            {
                FileType.Json => new JsonDeserializer(FilePath),
                FileType.Xml => new XmlDeserializer(FilePath),
                _ => throw new System.Exception("Invalid file type")
            };


            IOutputWriter outputWriter = outPutDest.outputType switch
            {
                OutputType.Console => new ConsoleOutput(),
                OutputType.File => new FileOutput(outPutDest.FilePath ?? ""),
                _ => throw new System.Exception("Invalid output type")
            };

            ShapesDataStore dataStore = new ShapesDataStore(deserializer, outputWriter);

            dataStore.DeserializeFile();
            dataStore.Write();


        }
    }
}
