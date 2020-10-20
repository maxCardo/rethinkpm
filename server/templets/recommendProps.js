const formatMoney = (data) => {
  if (!data) return '';
  return (new Intl.NumberFormat('en-US',
    {style: 'currency', currency: 'USD'}
  ).format(data))
}

const emailTemplate = (properties, message) => {
 const mlsStatus = {
   A: 'Active',
   C: 'Contingent',
   S: 'Sold',
   X: 'expired',
   W: 'withdrawn',
 };

 const rentTiers = {
   1: {
     eff: 550,
     '1BD': 616,
     '2BD': 759,
     '3BD': 968,
     '4BD': 1056,
     '5BD': 1214,
     '6BD': 1372,
   },
   2: {
     eff: 612,
     '1BD': 692,
     '2BD': 851,
     '3BD': 1080,
     '4BD': 1184,
     '5BD': 1361,
     '6BD': 1539,
   },
   3: {
     eff: 619,
     '1BD': 698,
     '2BD': 861,
     '3BD': 1094,
     '4BD': 1203,
     '5BD': 1383,
     '6BD': 1563,
   },
   4: {
     eff: 675,
     '1BD': 756,
     '2BD': 936,
     '3BD': 1188,
     '4BD': 1305,
     '5BD': 1500,
     '6BD': 1696,
   },
   5: {
     eff: 711,
     '1BD': 810,
     '2BD': 999,
     '3BD': 1242,
     '4BD': 1368,
     '5BD': 1573,
     '6BD': 1778,
   },
   6: {
     eff: 880,
     '1BD': 990,
     '2BD': 1221,
     '3BD': 1551,
     '4BD': 1705,
     '5BD': 1960,
     '6BD': 2216,
   },
   Pittsburgh: {
     eff: 466,
     '1BD': 573,
     '2BD': 726,
     '3BD': 915,
     '4BD': 997,
     '5BD': 1150,
     '6BD': 1150,
   },
 };

   
 
  const propertyTemplate = properties.map(property => {
    return `<div style="background-color:transparent;overflow:hidden" class="recommendedProperty"><div class="block-grid two-up"
                     style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; width: 100%; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                        <!--[if (mso)|(IE)]>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                               style="background-color:transparent;">
                            <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0" border="0" style="width:600px">
                                        <tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                        <!--[if (mso)|(IE)]>
                        <td align="center" width="200"
                            style="background-color:#ffffff;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"
                            valign="top">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding-right: 15px; padding-left: 15px; padding-top:15px; padding-bottom:15px;max-width:200px" width="200">
                        <![endif]-->
                        <div class="col num4"
                             style="display: table-cell; vertical-align: middle; max-width: 220px; min-width: 200px; width: 200px;">
                            <div style="width:100% !important;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 15px; padding-left: 15px;">
                                    <!--<![endif]-->
                                    <div class="img-container center fullwidthOnMobile autowidth" align="center"
                                         style="padding-right: 5px;padding-left: 5px;">
                                        <!--[if mso]>
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr style="line-height:0px">
                                                <td style="padding-right: 5px;padding-left: 5px;" align="center">
                                        <![endif]-->
                                        <div style="font-size:1px;line-height:5px">&nbsp;</div>
                                        <img class="center fullwidthOnMobile autowidth" align="middle" border="0"
                                             src="${property.images.length ? property.images[0]: 'https://fifthgrant.com/images/mediumsmall.png'}"
                                             alt="Suggestion 1" title="Suggestion first"
                                             style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 260px; display: block;"
                                             width="260">
                                        <div style="font-size:1px;line-height:5px">&nbsp;</div>
                                        <!--[if mso]></td></tr></table><![endif]-->
                                    </div>
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div>
                                <!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td>
                    <td align="center" width="400"
                        style="background-color:#ffffff;width:400px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"
                        valign="top">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding-right: 15px; padding-left: 0; padding-top:15px; padding-bottom:15px;">
                        <![endif]-->
                        <div class="col num8"
                             style="display: table-cell; vertical-align: middle; max-width: 420px; min-width: 400px; width: 400px;">
                            <div style="width:100% !important;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 15px; padding-left: 0;">
                                    <!--<![endif]-->
                                    <!--[if mso]>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="padding-right: 15px; padding-left: 20px; padding-top: 5px; padding-bottom: 5px; font-family: Arial, sans-serif">
                                    <![endif]-->
                                    <div style="color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:0;padding-right:15px;padding-bottom:0;padding-left:20px;">
                                        <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
                                            <p style="font-size: 24px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 29px; margin: 0;">
                                                <span style="font-size: 18px;">${property ? formatMoney(property.listPrice) : 'price data corrupted'}</span> <span
                                                    style="color: green; font-size: 14px;">${property.mlsStatus}</span></p>
                                        </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                    <!--[if mso]>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="padding-right: 15px; padding-left: 0; padding-top: 5px; padding-bottom: 5px; font-family: Arial, sans-serif">
                                    <![endif]-->
                                    <div style="color:#555555;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1;padding-top:5px;padding-right:15px;padding-bottom:5px;padding-left:15px;">
                                        <div style="line-height: 1; font-size: 12px; color: #555555; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 16px;">
                                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                                   style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                   valign="top">
                                                <tbody>
                                                    <tr style="vertical-align: top;" valign="top">
                                                        <td style="word-break: break-word; vertical-align: top; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;"
                                                            valign="top">
                                                            ${property.streetNumber} ${property.streetName} ${property.city}, ${property.zipcode}   
                                                        </td>
                                                    </tr>
                                                    ${property.propertyType === "res" ? 
                                                        `<tr style="vertical-align: top;" valign="top">
                                                            <td style="word-break: break-word; vertical-align: top; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;"
                                                            valign="top">
                                                            ${property.bedrooms} Bedrooms ${property.totalBaths} Baths ${property.buildingSize ? ' | SqFt: ' + property.buildingSize : ''}
                                                            </td>
                                                        </tr>`: ''
                                                    }
                                                    <tr style="vertical-align: top;" valign="top">
                                                        <td style="word-break: break-word; vertical-align: top; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;"
                                                            valign="top">
                                                            ${property.propertyType === "multi" ? "Multi-Unit | Zoning: "+ property.zoning+ '<br>' + property.numUnits + ' Units | ' + property.buildingSize+ ' SqFt'   : ""} ${property.propertyType === "res" ? "Residential | Zoning: "+ property.zoning : ""}
                                                        </td>
                                                    </tr>
                                                    <tr style="vertical-align: top;" valign="top">
                                                        <td style="word-break: break-word; vertical-align: top; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;"
                                                            valign="top">
                                                            Rent Tier: ${property.rents.HA.tier} <br>
                                                            Area Rents:${property.rents.HA.tier ?  ` eff: ${rentTiers[property.rents.HA.tier].eff} | 1BD: ${rentTiers[property.rents.HA.tier]['1BD']} | 2BD: ${rentTiers[property.rents.HA.tier]['2BD']} | 3BD: ${rentTiers[property.rents.HA.tier]['3BD']} | 4BD: ${rentTiers[property.rents.HA.tier]['4BD']}` : 'N/A'}
                                                         </td>
                                                    </tr>                                                
                                                    <tr style="vertical-align: top;" valign="top">
                                                        <td style="word-break: break-word; vertical-align: top; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;"
                                                            valign="top">
                                                            <a target="_blank" href="http://cardo.idxbroker.com/idx/details/listing/d504/${property.listNumber}?bid=${property._id}&mode=recommend">More Details</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div>
                                <!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                </div></div>`
  });

  let templateString = '';
  propertyTemplate.forEach(item => {
    templateString += item
  });

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                    <!--[if gte mso 9]>
                        <xml>
                            <o:OfficeDocumentSettings>
                            <o:AllowPNG/>
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                            </o:OfficeDocumentSettings>
                    </xml><![endif]-->
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width">
                    <!--[if !mso]><!-->
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <!--<![endif]-->
                    <title></title>
                    <!--[if !mso]><!-->
                    <!--<![endif]-->
                    <style type="text/css">
                        body {
                            margin: 0;
                            padding: 0;
                        }

                        table,
                        td,
                        tr {
                            vertical-align: top;
                            border-collapse: collapse;
                        }

                        * {
                            line-height: inherit;
                        }

                        a[x-apple-data-detectors=true] {
                            color: inherit !important;
                            text-decoration: none !important;
                        }
                    </style>
                    <style type="text/css" id="media-query">
                        @media (max-width: 620px) {

                            .block-grid,
                            .col {
                                min-width: 320px !important;
                                max-width: 100% !important;
                                display: block !important;
                            }

                            .block-grid {
                                width: 100% !important;
                            }

                            .col {
                                width: 100% !important;
                            }

                            .col > div {
                                margin: 0 auto;
                            }

                            img.fullwidth,
                            img.fullwidthOnMobile {
                                max-width: 100% !important;
                            }

                            .no-stack .col {
                                min-width: 0 !important;
                                display: table-cell !important;
                            }

                            .no-stack.two-up .col {
                                width: 50% !important;
                            }

                            .no-stack .col.num2 {
                                width: 16.6% !important;
                            }

                            .no-stack .col.num3 {
                                width: 25% !important;
                            }

                            .no-stack .col.num4 {
                                width: 33% !important;
                            }

                            .no-stack .col.num5 {
                                width: 41.6% !important;
                            }

                            .no-stack .col.num6 {
                                width: 50% !important;
                            }

                            .no-stack .col.num7 {
                                width: 58.3% !important;
                            }

                            .no-stack .col.num8 {
                                width: 66.6% !important;
                            }

                            .no-stack .col.num9 {
                                width: 75% !important;
                            }

                            .no-stack .col.num10 {
                                width: 83.3% !important;
                            }

                            .video-block {
                                max-width: none !important;
                            }

                            .mobile_hide {
                                min-height: 0px;
                                max-height: 0px;
                                max-width: 0px;
                                display: none;
                                overflow: hidden;
                                font-size: 0px;
                            }

                            .desktop_hide {
                                display: block !important;
                                max-height: none !important;
                            }
                        }
                    </style>
                </head>

<body class="clean-body" style="margin: 0; padding: 0;padding-top: 40px; -webkit-text-size-adjust: 100%; background-color: #f4f4f4;">
<!--[if IE]>
<div class="ie-browser"><![endif]-->
<table class="nl-container"
       style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f4f4; width: 100%; margin-top: 40px;"
       cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#f5eded" valign="top">
    <tbody>
    <tr style="vertical-align: top;" valign="top">
        <td style="word-break: break-word; vertical-align: top;" valign="top">
            <!--[if (mso)|(IE)]>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td align="center" style="background-color:#f4f4f4; padding-top: 40px;"><![endif]-->
            <div style="background-color:transparent;overflow:hidden">
                <div class="block-grid "
                     style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; width: 100%; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                        <!--[if (mso)|(IE)]>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                               style="background-color:transparent;">
                            <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0" border="0" style="width:600px">
                                        <tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                        <!--[if (mso)|(IE)]>
                        <td align="center" width="600"
                            style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"
                            valign="top">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; text-align: center;">
                        <![endif]-->
                        <div class="col num12"
                             style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                            <div style="width:100% !important;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                    <!--<![endif]-->
                                    <div class="img-container center autowidth" align="center"
                                         style="padding-right: 0px;padding-left: 0px;">
                                        <!--[if mso]>
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr style="line-height:0px">
                                                <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                        <![endif]--><img class="center autowidth" align="center" border="0"
                                                         src="https://fifthgrant.com/images/email-templates/recommendTemplate-header_top2.png"
                                                         alt="Alternate text" title="Alternate text"
                                                         style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 600px; display: block;"
                                                         width="600">
                                        <!--[if mso]></td></tr></table><![endif]-->
                                    </div>
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div>
                                <!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                </div>
            </div>
            <div style="background-color:transparent;overflow:hidden;">
                <div class="block-grid "
                     style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; width: 100%; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                        <!--[if (mso)|(IE)]>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                               style="background-color:transparent;">
                            <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0" border="0" style="width:600px">
                                        <tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                        <!--[if (mso)|(IE)]>
                        <td align="center" width="600"
                            style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"
                            valign="top">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;">
                        <![endif]-->
                        <div class="col num12"
                             style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                            <div style="width:100% !important;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                                    <!--<![endif]-->

                                   <!--[if mso]>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="padding-right: 5px; padding-left: 5px; padding-top: 5px; padding-bottom: 5px; font-family: Arial, sans-serif; text-align:center;" align="center">
                                    <![endif]-->
                                    <div style="color:#ffffff;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
                                        <div style="line-height: 1.2; font-size: 12px; color: #ffffff; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
                                            <img style="display: block; margin: 0 auto; max-width: 280px; width: 280px; height: auto"
                                                 src="https://fifthgrant.com/images/mediumsmall.png" alt="">
                                        </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->                                 
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div>
                                <!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                </div>
            </div>
            <div style="background-color:transparent;overflow:hidden">
                <div class="block-grid "
                     style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; width: 100%; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                        <!--[if (mso)|(IE)]>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                               style="background-color:transparent;">
                            <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0" border="0" style="width:600px">
                                        <tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                        <!--[if (mso)|(IE)]>
                        <td align="center" width="600"
                            style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"
                            valign="top">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding-right: 0px; padding-left: 0px; padding-top:35px; padding-bottom:35px;">
                        <![endif]-->
                        <div class="col num12"
                             style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                            <div style="width:100% !important;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:35px; padding-right: 0px; padding-left: 0px;">
                                    <!--<![endif]-->
                                   
                                    <!--[if mso]>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="padding-right: 5px; padding-left: 5px; padding-top: 5px; padding-bottom: 5px; font-family: Arial, sans-serif">
                                    <![endif]-->
                                    <div style="color:#27496d;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
                                        <div style="line-height: 1.2; font-size: 12px; color: #27496d; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
                                            <p style="font-size: 24px; text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: 29px; margin: 0;">
                                                <span style="font-size: 24px;">Take a look at these properties</span></p>
                                        </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                    <!--[if mso]>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="padding-right: 5px; padding-left: 5px; padding-top: 5px; padding-bottom: 5px; font-family: Arial, sans-serif">
                                    <![endif]-->
                                    <div style="color:#27496d;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
                                        <div style="line-height: 1.2; font-size: 12px; color: #27496d; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
                                            <p style="font-size: 12px; text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;">
                                                <span style="font-size: 12px;">${message}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div>
                                <!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                </div>
            </div>
            ${templateString}
            <div style="background-color:transparent;overflow:hidden">
                <div class="block-grid "
                     style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; width: 100%; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                        <!--[if (mso)|(IE)]>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                               style="background-color:transparent;">
                            <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0" border="0" style="width:600px">
                                        <tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                        <!--[if (mso)|(IE)]>
                        <td align="center" width="600"
                            style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;"
                            valign="top">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:20px;">
                        <![endif]-->
                        <div class="col num12"
                             style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                            <div style="width:100% !important;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:20px; padding-bottom:20px; padding-right: 0px; padding-left: 0px;">
                                    <!--<![endif]-->
                                    <!--[if mso]>
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif">
                                    <![endif]-->
                                    <div style="color:#757575;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                        <div style="line-height: 1.2; font-size: 12px; color: #757575; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
                                            <p style="font-size: 12px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 14px; margin: 0;">
                                                <span style="font-size: 12px;">...</span>
                                            </p>
                                        </div>
                                    </div>
                                    <!--[if mso]></td></tr></table><![endif]-->
                                                                        <!--[if mso]>
                                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                            <tr>
                                                                                <td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif">
                                                                        <![endif]-->
                                                                        <div style="color:#757575;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                                            <div style="line-height: 1.2; font-size: 12px; color: #757575; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
                                                                                <p style="font-size: 12px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 14px; margin: 0;">
                                                                                    <span style="font-size: 12px;"><a
                                                                                            style="text-decoration: underline; color: #0068a5;"
                                                                                            title="Terms & Conditions" href="http://www.example.com"
                                                                                            target="_blank" rel="noopener">Terms & Conditions</a> | <a
                                                                                            style="text-decoration: underline; color: #0068a5;"
                                                                                            title="Unsubscribe" href="http://www.example.com"
                                                                                            target="_blank" rel="noopener">Unsubscribe</a></span></p>
                                                                            </div>
                                                                        </div>
                                    <!--                                    [if mso]></td></tr></table>
                                    <![endif]&ndash;&gt;-->
                                    <!--[if (!mso)&(!IE)]><!-->
                                </div>
                                <!--<![endif]-->
                            </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                </div>
            </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
    </tr>
    </tbody>
</table>
<!--[if (IE)]></div><![endif]-->
</body>

</html>
`
}



exports.emailTemplate = emailTemplate;