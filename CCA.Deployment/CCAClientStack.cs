using Pulumi;
using Pulumi.Azure.Cdn;
using Pulumi.Azure.Cdn.Inputs;
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
                    IndexDocument = "index.html"
                }
            });

            var cdnProfile = new Profile("CCA-CDN", new ProfileArgs
            {
                Location = resourceGroup.Location,
                ResourceGroupName = resourceGroup.Name,
                Sku = "Standard_Microsoft",
            });

            var cdnEndpoint = new Endpoint("cca", new EndpointArgs
            {
                Name = "cca",
                ProfileName = cdnProfile.Name,
                Location = resourceGroup.Location,
                ResourceGroupName = resourceGroup.Name,
                OriginHostHeader = storageAccount.PrimaryWebHost,
                Origins =
                {
                    new EndpointOriginArgs
                    {
                        Name = "ccasite",
                        HostName = storageAccount.PrimaryWebHost,
                        HttpPort = 80,
                        HttpsPort = 443
                    }
                },
                DeliveryRules =
                {
                    new EndpointDeliveryRuleArgs
                    {
                        Name = "SPA",
                        Order = 1,
                        UrlFileExtensionConditions =
                        {
                            new EndpointDeliveryRuleUrlFileExtensionConditionArgs
                            {
                                Operator = "LessThan",
                                NegateCondition = false,
                                MatchValues =
                                {
                                    "1"
                                },
                            }
                        },
                        UrlRewriteAction = new EndpointDeliveryRuleUrlRewriteActionArgs
                        {
                            Destination = "/index.html",
                            PreserveUnmatchedPath = false,
                            SourcePattern = "/"
                        }
                    }
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
            CdnEndpoint = cdnEndpoint.HostName;
        }

        [Output]
        public Output<string> StaticEndpoint { get; set; }

        [Output]
        public Output<string> CdnEndpoint { get; set; }
    }
}
