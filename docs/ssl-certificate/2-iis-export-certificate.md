---
id: iis-2
title: 'IIS: Export SSL Certificate'
sidebar_label: 'IIS: Export SSL Certificate'
---

## Export SSL Certificate with Private Key

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

7. In the **Console** window, in the **Console Root** pane (left side), expand **Certificates (Local Computer)**, expand the folder that contains the certificate that you want to export/back up, and then, click the associated **Certificates** folder.

   **Note:** Your certificate should be in either the **Personal** or the **Web Hosting** folder.

   ![image](/img/docs/iis/iis-10-export-ssl-certificate-6.png)

8. In the center pane, right-click on the certificate that you want to export/back up and then click **All Tasks > Export**.
9. In the **Certificate Export Wizard**, on the **Welcome to the Certificate Export Wizard** page, click **Next**.
10. On the **Export Private Key** page, select **Yes, export the private key**, and then, click **Next**.

    ![image](/img/docs/iis/iis-10-export-ssl-certificate-7.png)

11. On the **Export File Format** page, select **Personal Information Exchange – PKCS #12 (.PFX)** and then check **Include all certificates in the certification path if possible**.

    **Warning**: Do not select **Delete the private key if the export is successful**.

    ![image](/img/docs/iis/iis-10-export-ssl-certificate-8.png)

12. On the **Security** page, select **password** and type your own password.

    ![image](/img/docs/iis/iis-10-export-ssl-certificate-9.png)

13. On the **File to Export** page, click **Browse**. In the **Save As** window, locate and select the certificate file that you want to export and then click **Save**. Finally, on the **File to Export** page, click **Next**.

    Make sure to note the filename and the location where you saved your file. If you only enter the filename without selecting a location, your file is saved to the following location: **C:\Windows\System32**.

    ![image](/img/docs/iis/iis-10-export-ssl-certificate-10.png)

14. On the **Completing the Certificate Export Wizard** page, verify that the settings are correct and then, click **Finish**.

    ![image](/img/docs/iis/iis-10-export-ssl-certificate-11.png)

15. You should receive **_"The export was successful"_** message. The SSL certificate w/private key .pfx file is now saved to the location that you selected.

## Unable to Export to PFX

On the occasion once we imported the \*.crt file into the Certificate mmc, We couldn't export it as a pfx certificate which Azure requires for it to be imported. As you can see all the pfx options are greyed out:

I have to admit I had a few problems initially when installing this certificate as it needed to be revoked due to some errors in the ordering process (not GoDaddys fault). Then I realised that there wasn't a Key icon on the certificate which it needs in order to be exported as a pfx certificate with the private key information contained in it. So what I needed to do was recover the private key.

First we need the Serial number of the certificate, to do this just double click the certificate from the certificate mmc and you should see it in the details tab.

Now to recover the private key, to do this, first open up a Command prompt and type in `certutil –repairstore my serialnumber` (Replace **serialnumber** with the number obtained above).

![image](/img/docs/iis/iis-10-export-ssl-certificate-grey.png)

Once that’s completed successfully then refresh the certificate mmc window and you should now be able to export it as a pfx file to then import into Azure or where ever you desire.

![image](/img/docs/iis/iis-10-export-ssl-certificate-cmd.jpg)

## References

- [digicert - Microsoft IIS 10: Moving an SSL Certificate to Another Server](https://www.digicert.com/ssl-support/certificate-pfx-file-export-import-iis-10.htm)
- [itquibbles - Unable to export to pfx](http://www.itquibbles.com/unable-to-export-to-pfx/)
