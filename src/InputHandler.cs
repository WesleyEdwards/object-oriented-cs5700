namespace ShapesProject
{
    public enum FileType { Json, Xml }
    public enum Actions { Display, Write, Exit }

    public class InputHandler
    {
        public InputHandler() { }
        public string GetInput(string prompt, string[]? possibilities)
        {
            Console.Write(prompt);
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
            string[] fileOptions = fileType switch
            {
                FileType.Json => new string[2] { "file1.json", "file2.json" },
                FileType.Xml => new string[2] { "file1.xml", "file2.xml" },
                _ => throw new Exception("Invalid file type")
            };

            string message = "Enter file name found in either ./jsonFiles or ./xmlFiles (eg. file1.json): ";
            string[] options = new string[] {
                "file1.json",
                "file2.json",
                "file3.json",
                "file1.xml",
                "file2.xml",
                "file3.xml",
            };
            string fileName = GetInput(message, options);

            return $"./{fileType.ToString().ToLower()}Files/{fileName}";
        }

        public Actions GetAction()
        {
            string message = "Enter action \n d -> Display Stats\n w -> write Stats to CSV file\n e -> exit\n";
            string res = GetInput(message, new string[3] { "d", "w", "e" });
            return res switch
            {
                "d" => Actions.Display,
                "w" => Actions.Write,
                "e" => Actions.Exit,
                _ => throw new Exception("Invalid action")
            };
        }

        public string GetNewFilePath()
        {
            string fileName = GetInput("Enter the desired name of the file (do not include the file extension): ", null);
            Console.WriteLine($"\nFile will be saved to ./outputFiles/{fileName}.csv\n");
            return $"./outputFiles/{fileName}.csv";
        }

        public bool RunTests()
        {
            string res = GetInput("Run tests? (y/n): ", new string[2] { "y", "n" });
            if (res == "y") return true;
            return false;
        }
    }
}