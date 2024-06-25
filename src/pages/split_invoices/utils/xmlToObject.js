export function parseXML(xmlText) {
    // Crear un nuevo objeto DOMParser
    var parser = new DOMParser();
    
    // Parsear el texto XML
    var xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    // Obtener el elemento raíz del XML
    var rootElement =  xmlDoc.documentElement;
    //console.log("ROOT ELEM: " + new XMLSerializer().serializeToString(rootElement))
    // Convertir el elemento raíz y sus hijos en un objeto literal recursivamente
    function parseElement(element) {
      var obj = {};
      if (element.hasAttributes()) {
        obj['attributes'] = {};
        var attributes = element.attributes;
        for (var i = 0; i < attributes.length; i++) {
          obj['attributes'][attributes[i].name] = attributes[i].value;
        }
      }
      if (element.hasChildNodes()) {
        var childNodes = element.childNodes;

        for (var i = 0; i < childNodes.length; i++) {
          var child = childNodes[i];
          


          if (child.nodeType === Node.TEXT_NODE) {
            // Si es un nodo de texto, asignar su valor al objeto
            obj['value'] = child.nodeValue.trim();
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            // Si es un nodo de elemento, recursivamente parsearlo
            if (!obj[child.nodeName]) {
              obj[child.nodeName] = [];
            }
            obj[child.nodeName].push(parseElement(child));
          }
        }
      }
      return obj;
    }
    
    // Parsear el elemento raíz y retornar el objeto literal resultante
    return parseElement(rootElement);
  }

  let normal =
  {
    "attributes": {
      "Version": "4.0",
      "Serie": "AMK",
      "Folio": "19060",
      "Fecha": "2024-01-09T11:16:19",
      "Sello": "ZbvJUVhThLXY6t/bVWCk7XJ0IKqRNobW3nqxb7TdYFefbPrg0UTXjiKXQbmrOinsgYG4+7DTQQp4NJuTpWNU/d51uhG2lwU0nxaBDJYeaSDW47yq5xNG26kto2myA72p7oSgggqJtWXAneRjABcBkSf5x+qHoh1Z4KIGjxSfcKknrjav7JpeYaNutzoSrHIOPBORotSLnxmcomyPco942rerO9VODTbHQqb1J5fmmwxxvqA62AUpqLEo61tweX1teXxKk1iadzMdulqn/7caljRAccP3ncs0lnoIQixKb0NXee+Cr7357PU0QpsUih6zch+i2BPYlFNBNHvwY1O69A==",
      "FormaPago": "01",
      "NoCertificado": "00001000000503232287",
      "Certificado": "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",
      "SubTotal": "474.14",
      "Moneda": "MXN",
      "Total": "550.00",
      "TipoDeComprobante": "I",
      "Exportacion": "01",
      "MetodoPago": "PUE",
      "LugarExpedicion": "27440",
      "xsi:schemaLocation": "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd",
      "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
    },
    "cfdi:Emisor": [
      {
        "attributes": {
          "Rfc": "TCA0407219T6",
          "Nombre": "TELEFONIA POR CABLE",
          "RegimenFiscal": "601"
        }
      }
    ],
    "cfdi:Receptor": [
      {
        "attributes": {
          "Rfc": "FASJ960709N19",
          "Nombre": "JESUS OMAR FACCUSEH SUAREZ",
          "UsoCFDI": "G03",
          "DomicilioFiscalReceptor": "27446",
          "RegimenFiscalReceptor": "625"
        }
      }
    ],
    "cfdi:Conceptos": [
      {
        "cfdi:Concepto": [
          {
            "attributes": {
              "ClaveProdServ": "83111801",
              "NoIdentificacion": "100110007",
              "Cantidad": "1",
              "ClaveUnidad": "E48",
              "Descripcion": "Cable TV Conecta Mensualidad Princ",
              "ValorUnitario": "145.690000",
              "Importe": "145.69",
              "ObjetoImp": "02"
            },
            "cfdi:Impuestos": [
              {
                "cfdi:Traslados": [
                  {
                    "cfdi:Traslado": [
                      {
                        "attributes": {
                          "Base": "145.690000",
                          "Impuesto": "002",
                          "TipoFactor": "Tasa",
                          "TasaOCuota": "0.160000",
                          "Importe": "23.31"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "attributes": {
              "ClaveProdServ": "83111801",
              "NoIdentificacion": "100210010",
              "Cantidad": "1",
              "ClaveUnidad": "E48",
              "Descripcion": "Premier Convertidor Mensualidad Princ",
              "ValorUnitario": "43.100000",
              "Importe": "43.10",
              "ObjetoImp": "02"
            },
            "cfdi:Impuestos": [
              {
                "cfdi:Traslados": [
                  {
                    "cfdi:Traslado": [
                      {
                        "attributes": {
                          "Base": "43.100000",
                          "Impuesto": "002",
                          "TipoFactor": "Tasa",
                          "TasaOCuota": "0.160000",
                          "Importe": "6.90"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "attributes": {
              "ClaveProdServ": "81112100",
              "NoIdentificacion": "100410122",
              "Cantidad": "1",
              "ClaveUnidad": "E48",
              "Descripcion": "Internet Internet Resid. 60 Mbps Mensualidad Princ",
              "ValorUnitario": "216.380000",
              "Importe": "216.38",
              "ObjetoImp": "02"
            },
            "cfdi:Impuestos": [
              {
                "cfdi:Traslados": [
                  {
                    "cfdi:Traslado": [
                      {
                        "attributes": {
                          "Base": "216.380000",
                          "Impuesto": "002",
                          "TipoFactor": "Tasa",
                          "TasaOCuota": "0.160000",
                          "Importe": "34.62"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "attributes": {
              "ClaveProdServ": "81161700",
              "NoIdentificacion": "100910116",
              "Cantidad": "1",
              "ClaveUnidad": "E48",
              "Descripcion": "Telefonia Telefonía Res Ilim Plus Mensualidad Princ",
              "ValorUnitario": "68.970000",
              "Importe": "68.97",
              "ObjetoImp": "02"
            },
            "cfdi:Impuestos": [
              {
                "cfdi:Traslados": [
                  {
                    "cfdi:Traslado": [
                      {
                        "attributes": {
                          "Base": "68.970000",
                          "Impuesto": "002",
                          "TipoFactor": "Tasa",
                          "TasaOCuota": "0.160000",
                          "Importe": "11.03"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "cfdi:Impuestos": [
      {
        "attributes": {
          "TotalImpuestosTrasladados": "75.86"
        },
        "cfdi:Traslados": [
          {
            "cfdi:Traslado": [
              {
                "attributes": {
                  "Base": "474.14",
                  "Impuesto": "002",
                  "TipoFactor": "Tasa",
                  "TasaOCuota": "0.160000",
                  "Importe": "75.86"
                }
              }
            ]
          }
        ]
      }
    ],
    "cfdi:Complemento": [
      {
        "tfd:TimbreFiscalDigital": [
          {
            "attributes": {
              "xsi:schemaLocation": "http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd",
              "Version": "1.1",
              "UUID": "118fb683-37cf-43ae-a7f4-ed35fc97a032",
              "FechaTimbrado": "2024-01-09T11:18:41",
              "RfcProvCertif": "LSO1306189R5",
              "SelloCFD": "ZbvJUVhThLXY6t/bVWCk7XJ0IKqRNobW3nqxb7TdYFefbPrg0UTXjiKXQbmrOinsgYG4+7DTQQp4NJuTpWNU/d51uhG2lwU0nxaBDJYeaSDW47yq5xNG26kto2myA72p7oSgggqJtWXAneRjABcBkSf5x+qHoh1Z4KIGjxSfcKknrjav7JpeYaNutzoSrHIOPBORotSLnxmcomyPco942rerO9VODTbHQqb1J5fmmwxxvqA62AUpqLEo61tweX1teXxKk1iadzMdulqn/7caljRAccP3ncs0lnoIQixKb0NXee+Cr7357PU0QpsUih6zch+i2BPYlFNBNHvwY1O69A==",
              "NoCertificadoSAT": "00001000000509846663",
              "SelloSAT": "LDcYmYDsGpaWl1qy1HPSuVm82V4WxHRYxPDZd28ZuwOGUQ8xhJsScss5E0gROPGpCwIVLl2KArTK3PsfrB3k4/sOPilGDf0Q2CEAw3QLqGxgIdEv9m7mJ/SwWGci1bC9x560b8BgFWKIF3mn19XkbLZUouQIn00y8+EmXwcS7kfcTe8n18HXI3p5bXC1HpGRofLOyiNAAtjNygy8IJ6NLiG4EbWedIppPXIuFJTSJkh/2l0teRk4lrxPN/B4KKbc8g70uWY1By7jr44cOYyt7uZtOItJptBt4Y9xQngPcxTLMRkl0NdKtNVIx0Fk+YiRtQUnu4mMSUMOuHgrp/pakQ==",
              "xmlns:tfd": "http://www.sat.gob.mx/TimbreFiscalDigital",
              "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
            }
          }
        ]
      }
    ]
  }

  let dev_ML =
  {
    "attributes": {
      "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "Version": "4.0",
      "xsi:schemaLocation": "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd",
      "Serie": "B",
      "Folio": "22569733",
      "Fecha": "2024-01-31T16:29:32",
      "Sello": "crpFCrnk1eHu6cg2KexQEzhyfqmr28Eit+P9Z/Wj29D/SvOup0XPSwCve2mM7jayvG9RY+Ns2eWj9JDj5ng4AlNUnRiPvWt3aH+moCz2ak2pMikBa/wsekUnAqn2qg9iBETZd6rrJRxq9lQtUhFudqZwXTXcSW1woItc63c4aRFa/kGKK9ZG1LOpZMktv4KHldZQxbQYklYYMQu7Jy7Jvei7lSVh0Wm3pac2O6g554GZIAB73jaXAe/2WgmgdLUK8/kqJHXkQH6o+1O0TFj0//lKD0/fzZqF4C/foJBNvOwQT6QYwL9oUV2DAg8eQ1MQ4Gi1jNQpfn1DQ7gfHbK8Dg==",
      "FormaPago": "27",
      "NoCertificado": "00001000000512083194",
      "Certificado": "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",
      "CondicionesDePago": "30 DIAS",
      "SubTotal": "142.57",
      "Moneda": "MXN",
      "TipoCambio": "1",
      "Total": "165.38",
      "TipoDeComprobante": "E",
      "Exportacion": "01",
      "MetodoPago": "PUE",
      "LugarExpedicion": "03940"
    },
    "cfdi:CfdiRelacionados": [
      {
        "attributes": {
          "TipoRelacion": "01"
        },
        "cfdi:CfdiRelacionado": [
          {
            "attributes": {
              "UUID": "8FA8F786-1345-4CFF-9AAF-BD09C699E3E1"
            }
          }
        ]
      }
    ],
    "cfdi:Emisor": [
      {
        "attributes": {
          "Rfc": "DCM991109KR2",
          "Nombre": "DEREMATE.COM DE MEXICO",
          "RegimenFiscal": "601"
        }
      }
    ],
    "cfdi:Receptor": [
      {
        "attributes": {
          "Rfc": "FASJ960709N19",
          "Nombre": "JESUS OMAR FACCUSEH SUAREZ",
          "DomicilioFiscalReceptor": "27446",
          "RegimenFiscalReceptor": "625",
          "UsoCFDI": "G02"
        }
      }
    ],
    "cfdi:Conceptos": [
      {
        "cfdi:Concepto": [
          {
            "attributes": {
              "ClaveProdServ": "84111506",
              "NoIdentificacion": "1",
              "ObjetoImp": "02",
              "Cantidad": "1.00",
              "ClaveUnidad": "ACT",
              "Unidad": "NA",
              "Descripcion": "Bonificaciones otorgadas por periodos anteriores29-01-2024",
              "ValorUnitario": "142.570000",
              "Importe": "142.57"
            },
            "cfdi:Impuestos": [
              {
                "cfdi:Traslados": [
                  {
                    "cfdi:Traslado": [
                      {
                        "attributes": {
                          "Base": "142.57",
                          "Impuesto": "002",
                          "TipoFactor": "Tasa",
                          "TasaOCuota": "0.160000",
                          "Importe": "22.81"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "cfdi:Impuestos": [
      {
        "attributes": {
          "TotalImpuestosTrasladados": "22.81"
        },
        "cfdi:Traslados": [
          {
            "cfdi:Traslado": [
              {
                "attributes": {
                  "Base": "142.57",
                  "Impuesto": "002",
                  "TipoFactor": "Tasa",
                  "TasaOCuota": "0.160000",
                  "Importe": "22.81"
                }
              }
            ]
          }
        ]
      }
    ],
    "cfdi:Complemento": [
      {
        "tfd:TimbreFiscalDigital": [
          {
            "attributes": {
              "FechaTimbrado": "2024-01-31T16:29:33",
              "UUID": "6B5A3D58-AAB6-4A0F-ACBE-E79BA81B82F3",
              "NoCertificadoSAT": "00001000000503270882",
              "SelloCFD": "crpFCrnk1eHu6cg2KexQEzhyfqmr28Eit+P9Z/Wj29D/SvOup0XPSwCve2mM7jayvG9RY+Ns2eWj9JDj5ng4AlNUnRiPvWt3aH+moCz2ak2pMikBa/wsekUnAqn2qg9iBETZd6rrJRxq9lQtUhFudqZwXTXcSW1woItc63c4aRFa/kGKK9ZG1LOpZMktv4KHldZQxbQYklYYMQu7Jy7Jvei7lSVh0Wm3pac2O6g554GZIAB73jaXAe/2WgmgdLUK8/kqJHXkQH6o+1O0TFj0//lKD0/fzZqF4C/foJBNvOwQT6QYwL9oUV2DAg8eQ1MQ4Gi1jNQpfn1DQ7gfHbK8Dg==",
              "SelloSAT": "VViY6PKv1h8MSjRE7njcH/caH+CRBiWN4MuQbldpU8cc+HvzF5Bgn2HzX8Uuy4zlU6N0bkXPvnamH/b5uzekGkNmVDOP9I9SCX5LtZI9zvJgTMLMIcMR76/av8M+1FBmEx7KhyPr2V2RDvooCBf6DCNpFx/1EZrFaHJ7Z+KthYJwyJHP03ARl/9/TxRNzBzvLnjOxJXTstKEPxyFGsRjCAlaouztWMhmj/s9Zdv7Fs5FSYTx1secC4YhOinWctNHwag1uq3kTgjqI3e8vdRIZGvTdAPrA6b9Ls0+ZLNd6s7b+pM7ig7cW6eG0B5O4hvfcClDYBqDTZkEjRrhuNNwsA==",
              "Version": "1.1",
              "RfcProvCertif": "TLE011122SC2",
              "xsi:schemaLocation": "http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd",
              "xmlns:tfd": "http://www.sat.gob.mx/TimbreFiscalDigital",
              "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
            }
          }
        ]
      }
    ]
  }


  let dev_x =
  {
    "attributes": {
      "xsi:schemaLocation": "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd http://www.sat.gob.mx/Pagos20 http://www.sat.gob.mx/sitio_internet/cfd/Pagos/Pagos20.xsd",
      "Version": "4.0",
      "Folio": "912",
      "Fecha": "2024-01-31T15:05:28",
      "NoCertificado": "00001000000508417677",
      "Certificado": "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",
      "SubTotal": "0",
      "Moneda": "XXX",
      "Exportacion": "01",
      "Total": "0",
      "TipoDeComprobante": "P",
      "LugarExpedicion": "07480",
      "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
      "xmlns:cfdi": "http://www.sat.gob.mx/cfd/4",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xmlns:pago20": "http://www.sat.gob.mx/Pagos20",
      "Sello": "UFEnzQRIvPqGtX8M278MaOtmZIkE3phF2hmzJlREUTohltFhF6aGJ3ZCWvExur9NumiJJSlkn1mjXkh7a4vuspoOCEkcDLKeZPDl2A7YSIfahYwgHPyg/h6+FRNQk8sB/8l5CzvCRK0VEbAOWo4wknomFuaCaF+1YZD5v+lUrnVboOGUMFsbFTFbovKFCjsX51ziN4S0tvdTEKvO4842zz+i4hiZwgk6S8rnYlyNatvlCtqIfP6gq6tjCqOWLJnTDN+SpWzIKIXjwMNGqZr6TqNlGfdKV6RluHqy2TTSUbFV97vHSS+7fMg9sJBUMu01JAPlXU2HUzetE5MkCFCwEQ=="
    },
    "cfdi:Emisor": [
      {
        "attributes": {
          "Rfc": "MHE090807CQA",
          "Nombre": "MULTICOMERCIALIZADORA DE HERRAMIENTAS E INSUMOS,",
          "RegimenFiscal": "601"
        }
      }
    ],
    "cfdi:Receptor": [
      {
        "attributes": {
          "Rfc": "FASJ960709N19",
          "Nombre": "JESUS OMAR FACCUSEH SUAREZ",
          "DomicilioFiscalReceptor": "27446",
          "RegimenFiscalReceptor": "625",
          "UsoCFDI": "CP01"
        }
      }
    ],
    "cfdi:Conceptos": [
      {
        "cfdi:Concepto": [
          {
            "attributes": {
              "ObjetoImp": "01",
              "ClaveProdServ": "84111506",
              "Cantidad": "1",
              "ClaveUnidad": "ACT",
              "Descripcion": "Pago",
              "ValorUnitario": "0",
              "Importe": "0"
            }
          }
        ]
      }
    ],
    "cfdi:Complemento": [
      {
        "pago20:Pagos": [
          {
            "attributes": {
              "Version": "2.0"
            },
            "pago20:Totales": [
              {
                "attributes": {
                  "TotalTrasladosBaseIVA16": "3318.10",
                  "TotalTrasladosImpuestoIVA16": "530.90",
                  "MontoTotalPagos": "3849.00"
                }
              }
            ],
            "pago20:Pago": [
              {
                "attributes": {
                  "FechaPago": "2024-01-31T15:05:28",
                  "FormaDePagoP": "06",
                  "MonedaP": "MXN",
                  "TipoCambioP": "1",
                  "Monto": "3849.00",
                  "NumOperacion": "FACML90194"
                },
                "pago20:DoctoRelacionado": [
                  {
                    "attributes": {
                      "IdDocumento": "B168DD66-56E7-48AC-9FAA-9141231FF56C",
                      "Serie": "FACML",
                      "Folio": "90194",
                      "MonedaDR": "MXN",
                      "EquivalenciaDR": "1",
                      "NumParcialidad": "1",
                      "ImpSaldoAnt": "3849.00",
                      "ImpPagado": "3849.00",
                      "ImpSaldoInsoluto": "0.00",
                      "ObjetoImpDR": "02"
                    },
                    "pago20:ImpuestosDR": [
                      {
                        "pago20:TrasladosDR": [
                          {
                            "pago20:TrasladoDR": [
                              {
                                "attributes": {
                                  "BaseDR": "3318.10",
                                  "ImpuestoDR": "002",
                                  "TipoFactorDR": "Tasa",
                                  "TasaOCuotaDR": "0.160000",
                                  "ImporteDR": "530.90"
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ],
                "pago20:ImpuestosP": [
                  {
                    "pago20:TrasladosP": [
                      {
                        "pago20:TrasladoP": [
                          {
                            "attributes": {
                              "BaseP": "3318.10",
                              "ImpuestoP": "002",
                              "TipoFactorP": "Tasa",
                              "TasaOCuotaP": "0.160000",
                              "ImporteP": "530.90"
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "tfd:TimbreFiscalDigital": [
          {
            "attributes": {
              "SelloSAT": "aRhN+yAbjXgmgRV6nVSCbAcNfF0oWTfsSVemAjLPM/6Lt52KOVpnchvpJ9sWlQQe9QnnkzO/BQzLw3jQPiJUkyXe7g5u9Qs7vgrHDJ/cSezKAUXqFiBuUYrANajndNrZJr0/AXnPKlwv4Rno9/5PkkxwxSMyg2HJyM3wJ3Kp5pTdWOH4UDN0IaQ4Ad5CNx5qUBz1zotdYTVzzWiuhO9ks6pxrtComunLHfuv6cB8PvsoWG+AybvaHtz3ha1FDu34ImphWZVYUcoPRv2NWl7iGY28QxY5bb2Ip3PczeBCty4cjt8afPUJT2lfVu0YP10c/565z6vcvdI1nbfKF/rc9A==",
              "NoCertificadoSAT": "00001000000702693654",
              "SelloCFD": "UFEnzQRIvPqGtX8M278MaOtmZIkE3phF2hmzJlREUTohltFhF6aGJ3ZCWvExur9NumiJJSlkn1mjXkh7a4vuspoOCEkcDLKeZPDl2A7YSIfahYwgHPyg/h6+FRNQk8sB/8l5CzvCRK0VEbAOWo4wknomFuaCaF+1YZD5v+lUrnVboOGUMFsbFTFbovKFCjsX51ziN4S0tvdTEKvO4842zz+i4hiZwgk6S8rnYlyNatvlCtqIfP6gq6tjCqOWLJnTDN+SpWzIKIXjwMNGqZr6TqNlGfdKV6RluHqy2TTSUbFV97vHSS+7fMg9sJBUMu01JAPlXU2HUzetE5MkCFCwEQ==",
              "FechaTimbrado": "2024-01-31T15:04:58",
              "UUID": "16AA77B4-EDF1-49B1-BCF3-EC22C4B9D9AC",
              "Version": "1.1",
              "RfcProvCertif": "TSP080724QW6",
              "xsi:schemaLocation": "http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd",
              "xmlns:tfd": "http://www.sat.gob.mx/TimbreFiscalDigital",
              "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
            }
          }
        ]
      }
    ]
  }
