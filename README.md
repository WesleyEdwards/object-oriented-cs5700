# Shapes Project

The entry point fo this program is contained in the `Program.cs` file. `dotnet run` should run the program. If not, then my worst nightmare has been realized

## User Input

You will be presented with the following prompts:

`Run tests? (y/n):`<br>

- Simply type 'y' indicating yes or 'n' if you do not want to run the tests. After running the tests, program will stop running.<br>

`Enter file type (json, xml):`<br>

- This is to help the program know which parser to use, whether you want a json or xml file parsed.

`Enter the relative path of a file (eg. './sample/file1.json' ). Sample files are found in the 'sample' directory:`<br>

- There are several xml and json files you can use to test in the sample directory.<br>
  You should be able to change, add, and remove shapes and it should still be able to parse them.<br>
  If you enter an invalid path or a path to the incorrect file type, the program will die a horrible death. You have been warned.

`Output to console or file? (c/f):`

- Enter either 'c' or 'f'. If you choose a file output, you will be prompted for the desired name of the file.

## Tests

There are two test classes used:<br>

`TestDeserializer`:

- This accepts a deserializer in the constructor. If it is an XML deserializer it will deserialize the file under src/tests/testFiles/testFile1.xml, and the json deserializer will deserialize the corresponding json file.<br>
  Both files contain the same data, which contain the same data as the Shapes Container object named `expected` within the test.<br>
  After deserializing, it will check the values of the deserialized object against the `expected` values by calculating and comparing the areas of the shapes. This shows that the deserialized values are deserialized correctly with a high certainty.<br>

`TestAreas`:

- This test checks whether the areas of each shape class correctly calculates the area. For each shape class, it calculates the area of that shape using both the Calculate Area function held within the class and checks it against equations contained within the testing environment that make sure the area is correctly calculated by the classes.

## References

I used this tool to create the XML schema for parsing the xml document<br>
https://learn.microsoft.com/en-us/visualstudio/xml-tools/how-to-create-an-xml-document-based-on-an-xsd-schema?view=vs-2022

For Json Parsing:<br>
https://www.newtonsoft.com/json

Method generally used to calculate area of triangles<br>
https://en.wikipedia.org/wiki/Heron%27s_formula
