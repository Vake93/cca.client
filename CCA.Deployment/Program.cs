using CCA.Client.Deployment;
using Pulumi;
using System.Threading.Tasks;

public static class Program
{
    public static Task<int> Main() => Deployment.RunAsync<CCAClientStack>();
}