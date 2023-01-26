namespace ShapesProject
{
    public enum FileType { Json, Xml }

    public class InputHandler
    {
        public InputHandler() { }
        public string GetInput(string prompt, string[]? possibilities)
        {
            Console.Write("\n" + prompt + "\n");
            while (true)
            {
                var response = Console.ReadLine();

                if (response == null) continue;
                if (possibilities == null) return response;
                if (possibilities.Contains(response))
                {
                    return response;
                }
                Console.WriteLine("Please enter valid input.\n");
            }
        }

        public FileType GetFileType()
        {
            var input = GetInput("Enter file type (json, xml): ", new string[2] { "json", "xml" });

            return input switch
            {
                "json" => FileType.Json,
                "xml" => FileType.Xml,
                _ => throw new Exception("Invalid file type")
            };
        }
        public string GetFilePath(FileType fileType)
        {

            string message = $"Enter the relative path of a file (eg. './sample/file1.{fileType.ToString().ToLower()}' ). Sample files are found in the 'sample' directory:";

            while (true)
            {
                var path = GetInput(message, null);
                if (fileType == FileType.Json && path.EndsWith(".json")) { return path; }
                if (fileType == FileType.Xml && path.EndsWith(".xml")) { return path; }
                Console.WriteLine("Please enter a valid file path.\n");
            }
        }

        public string GetNewFilePath()
        {
            string fileName = GetInput("Enter the desired name of the file (do not include the file extension): ", null);
            Console.WriteLine($"\nFile will be saved to ./outputFiles/{fileName}.csv\n");
            return $"./outputFiles/{fileName}.csv";
        }
        public bool GetRunTests()
        {
            string res = GetInput("Run tests? (y/n): ", new string[2] { "y", "n" });
            if (res == "y") return true;
            return false;
        }
        public OutputDest GetOutputDest()
        {
            string res = GetInput("Output to console or file? (c/f): ", new string[2] { "c", "f" });
            OutputDest outputDest = new OutputDest();
            if (res == "c")
            {
                outputDest.outputType = OutputType.Console;
                return outputDest;
            }
            outputDest.outputType = OutputType.File;
            outputDest.FilePath = GetNewFilePath();
            return outputDest;
        }
    }
}