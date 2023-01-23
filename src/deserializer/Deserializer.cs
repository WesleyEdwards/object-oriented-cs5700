namespace ShapesProject
{
    public interface IDeserializer
    {
        ShapesContainer Deserialize();
        void Serialize(string newFileName, ShapesContainer shapes);
    }
}

