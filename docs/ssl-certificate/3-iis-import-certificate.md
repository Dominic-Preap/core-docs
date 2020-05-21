---
id: iis-3
title: 'IIS: Import​ SSL Certificate'
sidebar_label: 'IIS: Import​ SSL Certificate'
---

1. In your Windows, go to **Run** and type **mmc**.
2. In the **Console** window, in the top menu, click **File > Add/Remove Snap-in**.

   ![image](/img/docs/iis/iis-10-export-ssl-certificate-1.png)

3. In the **Add or Remove Snap-ins** window, in the **Available snap-ins** pane (left side), select **Certificates** and then click **Add >**.

   ![image](/img/docs/iis/iis-10-export-ssl-certificate-2.png)

4. In the **Certificate snap-in** window, select **Computer account** and then click **Next**.

   ![image](/img/docs/iis/iis-10-export-ssl-certificate-3.png)

5. In the **Select Computer** window, select **Local computer: (the computer this console is running on)**, and then click Finish.

   ![image](/img/docs/iis/iis-10-export-ssl-certificate-4.png)

6. In the **Add or Remove Snap-ins** window, click **OK**.

   ![image](/img/docs/iis/iis-10-export-ssl-certificate-5.png)

7. In the **Console** window, in the **Console Root** pane (left side), expand **Certificates (Local Computer)**, right-click on the **Web Hosting** or **Personal** folder, and then click **All Tasks > Import**.

   ![image](/img/docs/iis/iis-10-import-ssl-certificate-1.png)

8. In the **Certificate Import Wizard**, on the **Welcome to the Certificate Import Wizard** page, click Next.

9. On the **File to Import** page, browse to and select the file that you want import and then, click **Next**.

   **Notes**: In the **File Explorer** window, in the file type drop-down, make sure to select All **Files (\*.\*)**. By default, it is set to search for **X.509 Certificate (_.cert;_.crt)** file types only.

   ![image](/img/docs/iis/iis-10-import-ssl-certificate-2.png)

10. On the **Completing the Certificate Import Wizard** page, verify that the settings are correct and then, click **Finish**.

    ![image](/img/docs/iis/iis-10-import-ssl-certificate-4.png)

## References

- [Microsoft IIS 10: Moving an SSL Certificate to Another Server](https://www.digicert.com/ssl-support/certificate-pfx-file-export-import-iis-10.htm)
