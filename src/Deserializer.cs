namespace ShapesProject
{
    public interface IDeserializer
    {
        RootShapesObject Deserialize(string fileName);
        void Serialize(string newFileName, RootShapesObject shapes);
    }
}

