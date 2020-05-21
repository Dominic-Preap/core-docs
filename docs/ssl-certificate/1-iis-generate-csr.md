---
id: iis-1
title: 'IIS: How to Generate CSR'
sidebar_label: 'IIS: How to Generate CSR'
---

## Create Your Certificate Signing Request (CSR) in IIS

Use the instructions on this page to create your certificate signing request (CSR) and then to download your SSL certificate

1. From the **Start** screen, find **Internet Information Services (IIS) Manager** and open it.
2. In the **Connections** pane, locate and click the server.
3. In the server **Home** page (center pane) under the **IIS** section, double-click **Server Certificates**.

   ![IMAGE HERE](/img/docs/iis/iis-8-csr-1.png)

4. In the **Actions** menu (right pane), click **Create Certificate Request**.

   ![IMAGE HERE](/img/docs/iis/iis-8-csr-2.png)

5. In the **Request Certificate** wizard, on the **Distinguished Name Properties** page, provide the information specified below and then click **Next**.

   | Field Name | Description |
   | --- | --- |
   | Common name | The fully-qualified domain name (FQDN) (e.g., www.example.com). |
   | Organization | Your company’s legally registered name (e.g., YourCompany, Inc.). |
   | Organizational unit | The name of your department within the organization. This entry will usually be listed as "IT", "Web Security", or is simply left blank. |
   | City/locality | The city where your company is legally located. |
   | State/province | The state/province where your company is legally located. |
   | Country/region | The country/region where your company is legally located. Use the drop-down list to select your country. |

   ![IMAGE HERE](/img/docs/iis/iis-8-csr-3.png)

6. On the **Cryptographic Service Provider Properties** page, provide the information specified below and then click **Next**.

   | Field Name | Description |
   | --- | --- |
   | Cryptographic service provider | In the drop-down list, select **Microsoft RSA SChannel Cryptographic Provider** (unless you have a specific cryptographic provider). |
   | Bit length | In the drop-down list, select **2048** (unless you have a specific reason for using a larger bit length). |

   ![IMAGE HERE](/img/docs/iis/iis-8-csr-4.png)

7. On the File Name page, under Specify a file name for the certificate request, click the `...` button to specify a save location for your CSR.

   ![IMAGE HERE](/img/docs/iis/iis-8-csr-5.png)

8. When you are done, click **Finish**.
9. Open the CSR file using a text editor (such as Notepad), then copy the text (including the `-----BEGIN NEW CERTIFICATE REQUEST-----` and `-----END NEW CERTIFICATE REQUEST-----` tags

## Configure and Download Your SSL Certificate with Godaddy

Assume that you already bought certificate from Godaddy.

1. Login into your Godaddy account and select **Manage SSL Certificates**.

   ![IMAGE HERE](/img/docs/iis/godaddy-1.png)

2. Click on **Rekey & Manage**.
3. In section **Re-Key certificate**, paste your CSR that you are generated from above, click **Save** and finally click on **Submit All Saved Changes**.

   ![IMAGE HERE](/img/docs/iis/godaddy-2.png)

4. Wait until it is successfully updated, then refresh the page and click **Download**.

   ![IMAGE HERE](/img/docs/iis/godaddy-3.png)

5. Choose **Server Type** as **IIS** and click **Download Zip File**.

## References

- [IIS 8 and IIS 8.5: Create CSR and Install SSL Certificate](https://www.digicert.com/csr-ssl-installation/iis-8-and-8.5.htm)
