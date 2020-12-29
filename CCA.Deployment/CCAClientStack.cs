using Pulumi;
using Pulumi.Azure.Core;
using Pulumi.Azure.Storage;
using Pulumi.Azure.Storage.Inputs;
using System.IO;

namespace CCA.Client.Deployment
{
    class CCAClientStack : Stack
    {
        public CCAClientStack()
        {
            var resourceGroup = new ResourceGroup("cca-client", new ResourceGroupArgs { Location = "SouthIndia" });

            var storageAccount = new Account("ccasite", new AccountArgs
            {
                ResourceGroupName = resourceGroup.Name,
                EnableHttpsTrafficOnly = true,
                AccountReplicationType = "LRS",
                AccountTier = "Standard",
                AccountKind = "StorageV2",
                StaticWebsite = new AccountStaticWebsiteArgs
                {
                    IndexDocument = "index.html",
                    Error404Document = "index.html"
                }
            });

            foreach (var file in Directory.GetFiles("../client/build", "*", SearchOption.AllDirectories))
            {
                var relativePath = Path.GetRelativePath("../client/build", file);
                var fileName = Path.GetFileName(file);

                _ = new Blob(relativePath, new BlobArgs
                {
                    Name = relativePath,
                    StorageAccountName = storageAccount.Name,
                    StorageContainerName = "$web",
                    Type = "Block",
                    Source = new FileAsset(file),
                    ContentType = MimeTypes.GetMimeType(fileName),
                });
            }

            StaticEndpoint = storageAccount.PrimaryWebEndpoint;
        }

        [Output] public Output<string> StaticEndpoint { get; set; }
    }
}
