# Setup Azure Web PubSub Service from UI

1. Create a free account on [Azure](https://azure.microsoft.com/en-us/free).

2. Go to [Azure Portal](https://portal.azure.com/#home)

3. Create Web PubSub Service on [Azure Portal](https://portal.azure.com/#create/Microsoft.AzureWebPubSub)
   Choose first option:
   ![Create PubSub](assets/azure/create-pubsub-1.png)

4. Create a new resource group and choose name for your pubsub service:
   ![Create new resource group](assets/azure/create-pubsub-2.png)

5. Click `Review + create`

6. Wait for validation and then click `Create`
   ![Create resource](assets/azure/create-pubsub-3.png)

7. After creating, you will be redirected. Click `Go to resource`:
   ![Go to resource](assets/azure/create-pubsub-4.png)

8. Go to `Keys` and copy `Connection string`:
   ![Get connection string](assets/azure/create-pubsub-5.png)

9. Paste `Connection string` in `.env` file.

10. Go to `Settings` and create new `Hub`:
    ![Create Hub](assets/azure/create-pubsub-6.png)
    ![Save Hub](assets/azure/create-pubsub-7.png)

11. Paste hub name in `.env` file.

For more information visit: [Azure Web PubSub Service](https://docs.microsoft.com/en-us/azure/azure-web-pubsub/overview)
