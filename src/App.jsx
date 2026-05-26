import { useState, useMemo, useEffect, useRef, useCallback } from "react";

const PRODUCTS = [
  {id:2, orden:1, familia:"Floral / Floral", inspired:"FLOWERS", fragancia:"DONNA X09", tipo:"EDP", tapa:"STRIPE", genero:"DONNA", cod100:"309", codProb:"5909"},
  {id:3, orden:2, familia:"Floral", inspired:"ANGEL O' DEMON LE SECRET", fragancia:"DONNA X53", tipo:"EDP", tapa:"STRIPE", genero:"DONNA", cod100:"353", codProb:"5953"},
  {id:1, orden:3, familia:"Floral / Fruity - Fresh", inspired:"C. H. 212", fragancia:"DONNA X04", tipo:"EDP", tapa:"STRIPE", genero:"DONNA", cod100:"304", codProb:"5904"},
  {id:4, orden:4, familia:"Floral / Madera", inspired:"LADY MILLION", fragancia:"DONNA X59", tipo:"EDP", tapa:"STRIPE", genero:"DONNA", cod100:"359", codProb:"5959"},
  {id:5, orden:5, familia:"Oriental / Madera", inspired:"212 VIP", fragancia:"DONNA X66", tipo:"EDP", tapa:"STRIPE", genero:"DONNA", cod100:"366", codProb:"5966"},
  {id:6, orden:6, familia:"Oriental / Floral", inspired:"LA VIDA ES BELLA", fragancia:"DONNA X73", tipo:"EDP", tapa:"STRIPE", genero:"DONNA", cod100:"373", codProb:"5973"},
  {id:7, orden:7, familia:"Chipre / Frutal", inspired:"212 VIP ROSE", fragancia:"DONNA X75", tipo:"EDP", tapa:"STRIPE", genero:"DONNA", cod100:"375", codProb:"5975"},
  {id:8, orden:8, familia:"Oriental / Floral", inspired:"OLYMPEA", fragancia:"DONNA X81", tipo:"EDP", tapa:"STRIPE", genero:"DONNA", cod100:"381", codProb:"5981"},
  {id:9, orden:9, familia:"Oriental / Floral", inspired:"LADY MILLON PRIVE", fragancia:"DONNA X85", tipo:"EDP", tapa:"TAG", genero:"DONNA", cod100:"85", codProb:"5985"},
  {id:10, orden:10, familia:"Floral / Frutal", inspired:"212 WILL PARTY", fragancia:"DONNA X86", tipo:"EDP", tapa:"TAG", genero:"DONNA", cod100:"86", codProb:"5986"},
  {id:11, orden:11, familia:"Oriental / Floral", inspired:"GOOD GIRL", fragancia:"DONNA X87", tipo:"EDP", tapa:"TAG", genero:"DONNA", cod100:"87", codProb:"5987"},
  {id:12, orden:12, familia:"Floral / Madera", inspired:"K. WORD", fragancia:"DONNA X88", tipo:"EDP", tapa:"HAWAII", genero:"DONNA", cod100:"88", codProb:"5988"},
  {id:13, orden:13, familia:"Floral / Oriental", inspired:"OLYMPEA INTENSE", fragancia:"DONNA X89", tipo:"EDP", tapa:"HAWAII", genero:"DONNA", cod100:"89", codProb:"5989"},
  {id:14, orden:14, familia:"Chypre / Cuero", inspired:"CH PRIVEE", fragancia:"DONNA X90", tipo:"EDP", tapa:"HAWAII", genero:"DONNA", cod100:"90", codProb:"5990"},
  {id:15, orden:15, familia:"Floral", inspired:"OLYMPÉA ACQUA", fragancia:"DONNA X91", tipo:"EDP", tapa:"FLOWERS", genero:"DONNA", cod100:"91", codProb:"5991"},
  {id:16, orden:16, familia:"Oriental", inspired:"LA VIE EST BELLE L'ECLAT", fragancia:"DONNA X92", tipo:"EDP", tapa:"FLOWERS", genero:"DONNA", cod100:"92", codProb:"5992"},
  {id:17, orden:17, familia:"Oriental / Floral", inspired:"GOOD GIRL LÉGÈRE", fragancia:"DONNA X93", tipo:"EDP", tapa:"FLOWERS", genero:"DONNA", cod100:"93", codProb:"5993"},
  {id:18, orden:18, familia:"Chipre / Floral", inspired:"SCANDAL JPG", fragancia:"DONNA X94", tipo:"EDP", tapa:"FLOWERS", genero:"DONNA", cod100:"94", codProb:"5994"},
  {id:19, orden:19, familia:"Floral / Amaderada", inspired:"L'INTERDIT", fragancia:"DONNA X95", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"95", codProb:"5995"},
  {id:20, orden:20, familia:"Floral / Chipre", inspired:"IDOLE", fragancia:"DONNA X96", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"96", codProb:"5996"},
  {id:21, orden:21, familia:"Oriental / Gourmand", inspired:"LA BELLE", fragancia:"DONNA X97", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"97", codProb:"5997"},
  {id:22, orden:22, familia:"Oriental / Floral", inspired:"SCANDAL BY NIGHT JPG", fragancia:"DONNA X98", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"98", codProb:"5998"},
  {id:23, orden:23, familia:"Floral / Oriental", inspired:"PURE XS FOR HER", fragancia:"DONNA X99", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"99", codProb:"5999"},
  {id:24, orden:24, familia:"Oriental", inspired:"LA VIE EST BELLE INTENSÉMENT", fragancia:"DONNA X100", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"100", codProb:"7100"},
  {id:25, orden:25, familia:"Floral", inspired:"MY WAY", fragancia:"DONNA X115", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"115", codProb:"7115"},
  {id:26, orden:26, familia:"Floral / Frutal", inspired:"SO SCANDAL", fragancia:"DONNA X116", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"116", codProb:"7116"},
  {id:27, orden:27, familia:"Floral / Frutal", inspired:"VERY GOOD GIRL", fragancia:"DONNA X117", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"117", codProb:"7117"},
  {id:28, orden:28, familia:"Floral", inspired:"LADY MILLON FABULOUS", fragancia:"DONNA X118", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"118", codProb:"7118"},
  {id:29, orden:29, familia:"Ambar / Fougere", inspired:"LIBRE EDP", fragancia:"DONNA X119", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"119", codProb:"7119"},
  {id:30, orden:30, familia:"Floral / Frutal", inspired:"212 HEROES FOR HER", fragancia:"DONNA X120", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"120", codProb:"7120"},
  {id:31, orden:31, familia:"Gourmand", inspired:"SCANDAL LE PARFUM", fragancia:"DONNA X128", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:32, orden:32, familia:"Floral", inspired:"OLYMPÉA FLORA", fragancia:"DONNA X129", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:33, orden:33, familia:"Frutal", inspired:"GOOD GIRL BLUSH EDP", fragancia:"DONNA X130", tipo:"EDP", tapa:"TRAVEL", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:34, orden:34, familia:"Almizcle / Floral", inspired:"FAME", fragancia:"DONNA X124", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:35, orden:35, familia:"Cítrica / Aromática", inspired:"OLIMPEA SOLAR", fragancia:"DONNA X125", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:36, orden:36, familia:"Floral / Frutal", inspired:"OUI LA VIE EST BELLE", fragancia:"DONNA X126", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:37, orden:37, familia:"Floral", inspired:"OLYMPEA PARFUM", fragancia:"DONNA X137", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"nuevo", codProb:"nuevo"},
  {id:38, orden:38, familia:"Gourmand / Floral", inspired:"DIVINE", fragancia:"DONNA X138", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"nuevo", codProb:"nuevo"},
  {id:39, orden:39, familia:"Gourmand / Oriental", inspired:"DEVOTION", fragancia:"DONNA X139", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"nuevo", codProb:"nuevo"},
  {id:40, orden:40, familia:"Floral / Oriental", inspired:"V. DONNA BORN IN ROMA", fragancia:"DONNA X140", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"nuevo", codProb:"nuevo"},
  {id:41, orden:41, familia:"Oriental / Amaderado", inspired:"ALIEN", fragancia:"DONNA X141", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"nuevo", codProb:"nuevo"},
  {id:42, orden:42, familia:"Gourmand / Aromática", inspired:"GODDESS", fragancia:"DONNA X142", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"nuevo", codProb:"nuevo"},
  {id:43, orden:43, familia:"Floral / Ambar", inspired:"GOOD GIRL BLUSH ELIXIR EDP", fragancia:"DONNA X143", tipo:"EDP", tapa:"NEON", genero:"DONNA", cod100:"nuevo", codProb:"nuevo"},
  {id:44, orden:44, familia:"Chipre / Fresco", inspired:"CK ONE", fragancia:"XXX", tipo:"EDP", tapa:"STRIPE", genero:"UNISEX", cod100:"600", codProb:"6900"},
  {id:45, orden:45, familia:"Chipre / Fresco", inspired:"L'EAU D'ISSEY", fragancia:"UOMO X02", tipo:"EDP", tapa:"STRIPE", genero:"UOMO", cod100:"602", codProb:"6902"},
  {id:46, orden:46, familia:"Chipre / Fresco", inspired:"KENZO POUR HOMME", fragancia:"UOMO X03", tipo:"EDP", tapa:"STRIPE", genero:"UOMO", cod100:"603", codProb:"6903"},
  {id:47, orden:47, familia:"Chipre / Fresco", inspired:"212 MEN", fragancia:"UOMO X07", tipo:"EDP", tapa:"STRIPE", genero:"UOMO", cod100:"607", codProb:"6907"},
  {id:48, orden:48, familia:"Madera / Especiado", inspired:"1 MILLON", fragancia:"UOMO X37", tipo:"EDP", tapa:"STRIPE", genero:"UOMO", cod100:"637", codProb:"6937"},
  {id:49, orden:49, familia:"Oriental / Madera", inspired:"212 VIP", fragancia:"UOMO X59", tipo:"EDP", tapa:"STRIPE", genero:"UOMO", cod100:"659", codProb:"6959"},
  {id:50, orden:50, familia:"Madera / Acuático", inspired:"INVICTUS", fragancia:"UOMO X64", tipo:"EDP", tapa:"STRIPE", genero:"UOMO", cod100:"664", codProb:"6964"},
  {id:51, orden:51, familia:"Fougere / Aromático", inspired:"DIOR SAUVAGE", fragancia:"UOMO X68", tipo:"EDP", tapa:"STRIPE", genero:"UOMO", cod100:"668", codProb:"6968"},
  {id:52, orden:52, familia:"Amaderado / Acuático", inspired:"INVICTUS AQUA", fragancia:"UOMO X71", tipo:"EDP", tapa:"TAG", genero:"UOMO", cod100:"471", codProb:"6971"},
  {id:53, orden:53, familia:"Aromático", inspired:"ABERCROMBIE", fragancia:"UOMO X72", tipo:"EDP", tapa:"TAG", genero:"UOMO", cod100:"472", codProb:"6972"},
  {id:54, orden:54, familia:"Oriental", inspired:"1 MILLON PRIVE", fragancia:"UOMO X73", tipo:"EDP", tapa:"TAG", genero:"UOMO", cod100:"473", codProb:"6973"},
  {id:55, orden:55, familia:"Oriental", inspired:"XS L'APHRODISIAQUE", fragancia:"UOMO X74", tipo:"EDP", tapa:"HAWAII", genero:"UOMO", cod100:"474", codProb:"6974"},
  {id:56, orden:56, familia:"Amaderada", inspired:"INVICTUS INTENSE", fragancia:"UOMO X75", tipo:"EDP", tapa:"HAWAII", genero:"UOMO", cod100:"475", codProb:"6975"},
  {id:57, orden:57, familia:"Aromático / Especiado", inspired:"PURE XS", fragancia:"UOMO X76", tipo:"EDP", tapa:"HAWAII", genero:"UOMO", cod100:"476", codProb:"6976"},
  {id:58, orden:58, familia:"Oriental / Especiada", inspired:"BAD BOY", fragancia:"UOMO X77", tipo:"EDP", tapa:"NEON", genero:"UOMO", cod100:"477", codProb:"6977"},
  {id:59, orden:59, familia:"Amaderada", inspired:"212 VIP BLACK EXTRA", fragancia:"UOMO X78", tipo:"EDP", tapa:"NEON", genero:"UOMO", cod100:"478", codProb:"6978"},
  {id:60, orden:60, familia:"Amaderada / Aromática", inspired:"LE BLEAU", fragancia:"UOMO X79", tipo:"EDP", tapa:"NEON", genero:"UOMO", cod100:"479", codProb:"6979"},
  {id:61, orden:61, familia:"Fougere / Aromático", inspired:"EROS", fragancia:"UOMO X106", tipo:"EDP", tapa:"NEON", genero:"UOMO", cod100:"nuevo", codProb:"nuevo"},
  {id:62, orden:62, familia:"Fougere", inspired:"212 MEN HEROES", fragancia:"UOMO X89", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"489", codProb:"6989"},
  {id:63, orden:63, familia:"Madera / Especiado", inspired:"PHANTOM", fragancia:"UOMO X90", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"490", codProb:"6990"},
  {id:64, orden:64, familia:"Amaderado", inspired:"SCANDAL POUR", fragancia:"UOMO X91", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"491", codProb:"6991"},
  {id:65, orden:65, familia:"Amaderada", inspired:"KENZO HOME", fragancia:"UOMO X92", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"492", codProb:"6992"},
  {id:66, orden:66, familia:"Amaderada", inspired:"SAUVAGE ELIXIR", fragancia:"UOMO X93", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"493", codProb:"6993"},
  {id:67, orden:67, familia:"Chipre / Frutal", inspired:"AVENTUS CREED", fragancia:"UOMO X94", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:68, orden:68, familia:"Amaderada", inspired:"INVICTUS PLATINUM", fragancia:"UOMO X95", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:69, orden:69, familia:"Amaderada", inspired:"ONE MILLON ELIXIR", fragancia:"UOMO X98", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:70, orden:70, familia:"Aromático / Amaderado", inspired:"1 MILLION ROYAL", fragancia:"UOMO X99", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:71, orden:71, familia:"Especiado", inspired:"INVICTUS VICTORY ELIXIR INTENSE", fragancia:"UOMO X100", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:72, orden:72, familia:"Fougere / Oriental", inspired:"Y", fragancia:"UOMO X101", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:73, orden:73, familia:"Aromático", inspired:"INVICTUS PARFUM", fragancia:"UOMO X103", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"nuevo", codProb:"nuevo"},
  {id:74, orden:74, familia:"Oriental", inspired:"SCANDAL POR HOME ABSOLUT", fragancia:"UOMO X104", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"nuevo", codProb:"nuevo"},
  {id:75, orden:75, familia:"Especiada", inspired:"STRONGER WITH YOU", fragancia:"UOMO X105", tipo:"EDP", tapa:"BLACK", genero:"UOMO", cod100:"nuevo", codProb:"nuevo"},
  {id:76, orden:76, familia:"Ambar", inspired:"SOLEIL BLANCK", fragancia:"UNISEX XX01", tipo:"EDP", tapa:"PRIVE", genero:"UNISEX", cod100:"701", codProb:"—"},
  {id:77, orden:77, familia:"Amaderada / Aromática", inspired:"LE LABO SANTALE", fragancia:"UNISEX XX02", tipo:"EDP", tapa:"PRIVE", genero:"UNISEX", cod100:"702", codProb:"—"},
  {id:78, orden:78, familia:"Floral / Frutal", inspired:"UN JARDIN SUR LE NIL", fragancia:"UNISEX XX03", tipo:"EDP", tapa:"PRIVE", genero:"UNISEX", cod100:"703", codProb:"—"},
  {id:79, orden:79, familia:"Cuero", inspired:"TF. OMBRE LEATHER PARFUM", fragancia:"UNISEX XX04", tipo:"EDP", tapa:"PRIVE", genero:"UNISEX", cod100:"nuevo", codProb:"nuevo"},
  {id:80, orden:80, familia:"Floral / Ambarado", inspired:"BACCARAT ROUGE 540", fragancia:"UNISEX XX05", tipo:"EDP", tapa:"PRIVE", genero:"UNISEX", cod100:"nuevo", codProb:"nuevo"},
  {id:81, orden:81, familia:"Oriental / Frutal", inspired:"ERBA PURA", fragancia:"UNISEX XX06", tipo:"EDP", tapa:"PRIVE", genero:"UNISEX", cod100:"nuevo", codProb:"nuevo"},
  {id:82, orden:82, familia:"Ambar / Vainilla", inspired:"YARA", fragancia:"UNISEX XX07", tipo:"EDP", tapa:"PRIVE", genero:"UNISEX", cod100:"nuevo", codProb:"nuevo"},
  {id:83, orden:83, familia:"Oriental / Vainilla", inspired:"KHAMRAH QAHWA", fragancia:"UNISEX XX08", tipo:"EDP", tapa:"PRIVE", genero:"UNISEX", cod100:"nuevo", codProb:"nuevo"},
  {id:84, orden:84, familia:"Fougere / Fresco", inspired:"COOL WATER", fragancia:"UOMO X01", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"601", codProb:"6961"},
  {id:85, orden:85, familia:"Chipre / Fresh", inspired:"ACQUA DI GIO", fragancia:"UOMO X05", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:86, orden:86, familia:"Chipre / Fresco", inspired:"FAHRENHEIT", fragancia:"UOMO X06", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:87, orden:87, familia:"Chipre / Cuero", inspired:"POLO", fragancia:"UOMO X08", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:88, orden:88, familia:"Chipre / Cítrico", inspired:"POLO BLUE", fragancia:"UOMO X17", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:89, orden:89, familia:"Chipre / Cítrico", inspired:"HUGO", fragancia:"UOMO X18", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:90, orden:90, familia:"Oriental / Especiado", inspired:"L'BLUE D'ISSEY", fragancia:"UOMO X19", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:91, orden:91, familia:"Fougere / Fresco", inspired:"BLUE LABEL", fragancia:"UOMO X20", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:92, orden:92, familia:"Fougere / Madera", inspired:"POLO BLACK", fragancia:"UOMO X21", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:93, orden:93, familia:"Oriental / Especiado", inspired:"CODE", fragancia:"UOMO X22", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:94, orden:94, familia:"Fougere / Madera", inspired:"XS BLACK", fragancia:"UOMO X23", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:95, orden:95, familia:"Oriental / Ambarado", inspired:"212 SEXY", fragancia:"UOMO X24", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:96, orden:96, familia:"Madera / Floral", inspired:"CH", fragancia:"UOMO X43", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"643", codProb:"6943"},
  {id:97, orden:97, familia:"Hesperide / Aromático", inspired:"D. HOMME SPORT", fragancia:"UOMO X80", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"480", codProb:"6980"},
  {id:98, orden:98, familia:"Fougere / Oriental", inspired:"D&G THE ONE", fragancia:"UOMO X81", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"481", codProb:"6981"},
  {id:99, orden:99, familia:"Aromática / Fougère", inspired:"CK ETERNITY", fragancia:"UOMO X82", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"482", codProb:"6982"},
  {id:100, orden:100, familia:"Oriental / Especiado", inspired:"ANGEL", fragancia:"UOMO X83", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"483", codProb:"6983"},
  {id:101, orden:101, familia:"Amaderada / Aromática", inspired:"INVICTUS LEGEND", fragancia:"UOMO X84", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"484", codProb:"6984"},
  {id:102, orden:102, familia:"Amaderada", inspired:"ARMANI CODE PERFUMO", fragancia:"UOMO X85", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"485", codProb:"6985"},
  {id:103, orden:103, familia:"Amaderada / Ambar", inspired:"A*MEN ULTIMATE", fragancia:"UOMO X86", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"486", codProb:"6966"},
  {id:104, orden:104, familia:"Amaderada / Especiada", inspired:"TERRE D'HERMES", fragancia:"UOMO X87", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"487", codProb:"6987"},
  {id:105, orden:105, familia:"Amaderada / Ambar", inspired:"OUD WOOD TOM FORD", fragancia:"UOMO X88", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"488", codProb:"6988"},
  {id:106, orden:106, familia:"Cuero / Floral", inspired:"1 MILLON PARFUM", fragancia:"UOMO X96", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"496", codProb:"6988"},
  {id:107, orden:107, familia:"Oriental", inspired:"INVICTUS VICTORY", fragancia:"UOMO X97", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"497", codProb:"6988"},
  {id:108, orden:108, familia:"Fougere / Oriental", inspired:"LE MALE", fragancia:"UOMO X102", tipo:"EDP", tapa:"FLUO", genero:"UOMO", cod100:"—", codProb:"—"},
  {id:109, orden:109, familia:"Floral / Dulce", inspired:"RED DOOR", fragancia:"DONNA X01", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"301", codProb:"—"},
  {id:110, orden:110, familia:"Floral / Fresco", inspired:"5th AVENUE", fragancia:"DONNA X02", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"302", codProb:"5902"},
  {id:111, orden:111, familia:"Floral / Dulce", inspired:"PLEASURES", fragancia:"DONNA X03", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"303", codProb:"—"},
  {id:112, orden:112, familia:"Floral / Fresco", inspired:"KENZO D'ETE", fragancia:"DONNA X05", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"305", codProb:"—"},
  {id:113, orden:113, familia:"Floral / Frutal", inspired:"L'EAU D'ISSEY", fragancia:"DONNA X06", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"306", codProb:"—"},
  {id:114, orden:114, familia:"Chipre / Fresco", inspired:"L'EAU PAR KENZO", fragancia:"DONNA X07", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"307", codProb:"—"},
  {id:115, orden:115, familia:"Floral / Fresco", inspired:"ACQUA DI GIO", fragancia:"DONNA X08", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"308", codProb:"—"},
  {id:116, orden:116, familia:"Floral / Frutal", inspired:"RALPH LAUREN", fragancia:"DONNA X11", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"311", codProb:"—"},
  {id:117, orden:117, familia:"Floral", inspired:"TOMMY GIRL", fragancia:"DONNA X12", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"12", codProb:"—"},
  {id:118, orden:118, familia:"Oriental", inspired:"ANGEL", fragancia:"DONNA X13", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"113", codProb:"—"},
  {id:119, orden:119, familia:"Floral", inspired:"ETERNITY", fragancia:"DONNA X14", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"314", codProb:"—"},
  {id:120, orden:120, familia:"Floral / Aldehydic", inspired:"CHANEL 5", fragancia:"DONNA X15", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"315", codProb:"5915"},
  {id:121, orden:121, familia:"Floral / Fresco", inspired:"ANAIS ANAIS", fragancia:"DONNA X16", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"316", codProb:"5916"},
  {id:122, orden:122, familia:"Floral / Aldehydic", inspired:"HALLOWEEN", fragancia:"DONNA X19", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"319", codProb:"5919"},
  {id:123, orden:123, familia:"Floral", inspired:"ULTRAVIOLET", fragancia:"DONNA X20", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"320", codProb:"—"},
  {id:124, orden:124, familia:"Floral / Acuático", inspired:"COOL WATER", fragancia:"DONNA X21", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"321", codProb:"—"},
  {id:125, orden:125, familia:"Floral / Verde", inspired:"ESCAPE", fragancia:"DONNA X22", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"322", codProb:"—"},
  {id:126, orden:126, familia:"Floral / Verde", inspired:"CABOTINE", fragancia:"DONNA X23", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"323", codProb:"—"},
  {id:127, orden:127, familia:"Floral / Fresco", inspired:"CLIC", fragancia:"DONNA X25", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"325", codProb:"—"},
  {id:128, orden:128, familia:"Floral / Frutal", inspired:"VERY IRRESISTIBLE", fragancia:"DONNA X26", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"326", codProb:"5926"},
  {id:129, orden:129, familia:"Floral / Fresco", inspired:"DONNA KARAN NY", fragancia:"DONNA X27", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"327", codProb:"5927"},
  {id:130, orden:130, familia:"Floral / Frutal", inspired:"AMOR AMOR", fragancia:"DONNA X28", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"328", codProb:"5928"},
  {id:131, orden:131, familia:"Floral / Frutal", inspired:"BLUE RL", fragancia:"DONNA X30", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"30", codProb:"5930"},
  {id:132, orden:132, familia:"Floral / Frutal", inspired:"DKNY BE DELICIOUS", fragancia:"DONNA X31", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"331", codProb:"5931"},
  {id:133, orden:133, familia:"Floral / Frutal", inspired:"C.H. 212 SEXY", fragancia:"DONNA X32", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"332", codProb:"—"},
  {id:134, orden:134, familia:"Oriental / Ambarado", inspired:"ORGANZA", fragancia:"DONNA X34", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"334", codProb:"—"},
  {id:135, orden:135, familia:"Ambarado / Dulce", inspired:"K. AMOUR", fragancia:"DONNA X36", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"336", codProb:"—"},
  {id:136, orden:136, familia:"Floral / Verde", inspired:"J'ADORE", fragancia:"DONNA X37", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"337", codProb:"5937"},
  {id:137, orden:137, familia:"Floral / Frutal", inspired:"D&G LIGHT BLUE", fragancia:"DONNA X39", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"339", codProb:"5939"},
  {id:138, orden:138, familia:"Floral / Oriental", inspired:"CH", fragancia:"DONNA X41", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"341", codProb:"—"},
  {id:139, orden:139, familia:"Floral / Dulce", inspired:"ANGEL Y DEMONIO", fragancia:"DONNA X42", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"342", codProb:"—"},
  {id:140, orden:140, familia:"Floral / Oriental", inspired:"D&G THE ONE", fragancia:"DONNA X43", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"343", codProb:"—"},
  {id:141, orden:141, familia:"Floral / Frutal", inspired:"NINA", fragancia:"DONNA X46", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"346", codProb:"—"},
  {id:142, orden:142, familia:"Floral / Madera", inspired:"MAGNIFIQUE", fragancia:"DONNA X47", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"347", codProb:"—"},
  {id:143, orden:143, familia:"Chipre / Frutal", inspired:"MISS DIOR CHERIE", fragancia:"DONNA X48", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"348", codProb:"—"},
  {id:144, orden:144, familia:"Floral / Frutal", inspired:"PH HEIRESS", fragancia:"DONNA X49", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"349", codProb:"5949"},
  {id:145, orden:145, familia:"Floral / Madera", inspired:"MADAME GOUTIER", fragancia:"DONNA X50", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"350", codProb:"—"},
  {id:146, orden:146, familia:"Floral / Frutal", inspired:"ROMANCE", fragancia:"DONNA X51", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"351", codProb:"—"},
  {id:147, orden:147, familia:"Floral / Frutal", inspired:"RICCI RICCI", fragancia:"DONNA X54", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"354", codProb:"5954"},
  {id:148, orden:148, familia:"Oriental / Madera", inspired:"HYPNOSE", fragancia:"DONNA X58", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"358", codProb:"—"},
  {id:149, orden:149, familia:"Floral / Frutal", inspired:"CH L'EAU BY CH", fragancia:"DONNA X60", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"360", codProb:"—"},
  {id:150, orden:150, familia:"Floral / Frutal", inspired:"ACQUA DI GIOIA", fragancia:"DONNA X62", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"362", codProb:"—"},
  {id:151, orden:151, familia:"Floral / Frutal", inspired:"FLOWER TAG", fragancia:"DONNA X68", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"368", codProb:"—"},
  {id:152, orden:152, familia:"Oriental / Floral", inspired:"SHOCK FOR HER", fragancia:"DONNA X70", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"370", codProb:"—"},
  {id:153, orden:153, familia:"Floral / Madera", inspired:"G. PLAY", fragancia:"DONNA X71", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"371", codProb:"5971"},
  {id:154, orden:154, familia:"Floral / Tuberosa", inspired:"ES LE PARFM", fragancia:"DONNA X72", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"372", codProb:"5972"},
  {id:155, orden:155, familia:"Floral / Frutal", inspired:"FLOWER IN THE AIR", fragancia:"DONNA X74", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"374", codProb:"5974"},
  {id:156, orden:156, familia:"Floral", inspired:"EAU MY GOLD LADY MILLON", fragancia:"DONNA X78", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"378", codProb:"—"},
  {id:157, orden:157, familia:"Floral", inspired:"LA VIDA ES BELLA LEGERE", fragancia:"DONNA X79", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"379", codProb:"—"},
  {id:158, orden:158, familia:"Floral / Frutal", inspired:"FLOWER L'ELIXIR", fragancia:"DONNA X82", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"382", codProb:"—"},
  {id:159, orden:159, familia:"Oriental", inspired:"LA NUIT TRESOR", fragancia:"DONNA X101", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"101", codProb:"7101"},
  {id:160, orden:160, familia:"Oriental / Vainilla", inspired:"BLACK OPIUM", fragancia:"DONNA X102", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"102", codProb:"7102"},
  {id:161, orden:161, familia:"Oriental / Floral", inspired:"COCO MADEMOISELLE", fragancia:"DONNA X103", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"103", codProb:"7103"},
  {id:162, orden:162, familia:"Floral / Acuático", inspired:"EMPERATRIS", fragancia:"DONNA X104", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"104", codProb:"7104"},
  {id:163, orden:163, familia:"Floral / Fresco", inspired:"A. BLACK CODE", fragancia:"DONNA X105", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"105", codProb:"7105"},
  {id:164, orden:164, familia:"Chipre / Frutal", inspired:"SI", fragancia:"DONNA X106", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"106", codProb:"7106"},
  {id:165, orden:165, familia:"Oriental / Ambarado", inspired:"HOT COUTURE", fragancia:"DONNA X107", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"107", codProb:"7107"},
  {id:166, orden:166, familia:"Floral / Frutal", inspired:"LA TENTATION DE NINA", fragancia:"DONNA X108", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"108", codProb:"7108"},
  {id:167, orden:167, familia:"Almizcle / Floral", inspired:"DAISY MARC JACOBS", fragancia:"DONNA X109", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"109", codProb:"7109"},
  {id:168, orden:168, familia:"Floral", inspired:"BLOOM GUCCI", fragancia:"DONNA X110", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"110", codProb:"7110"},
  {id:169, orden:169, familia:"Floral", inspired:"JASMINE SAMBAC JO MALONE", fragancia:"DONNA X111", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"111", codProb:"7111"},
  {id:170, orden:170, familia:"Oriental / Madera", inspired:"BLACK XS", fragancia:"DONNA X112", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"112", codProb:"7112"},
  {id:171, orden:171, familia:"Floral", inspired:"POEME", fragancia:"DONNA X113", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"113", codProb:"7113"},
  {id:172, orden:172, familia:"Oriental / Floral", inspired:"DIOR ADDICT", fragancia:"DONNA X114", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"114", codProb:"7114"},
  {id:173, orden:173, familia:"Floral / Frutal", inspired:"OMNIA CORAL", fragancia:"DONNA X121", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"121", codProb:"—"},
  {id:174, orden:174, familia:"Ambar / Floral", inspired:"BLACK ORCHID", fragancia:"DONNA X122", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"122", codProb:"—"},
  {id:175, orden:175, familia:"Floral / Frutal", inspired:"SI PASSIONE", fragancia:"DONNA X123", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"123", codProb:"—"},
  {id:176, orden:176, familia:"Floral", inspired:"FLORA GORGEOUS GARDENIA GUCCI", fragancia:"DONNA X127", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"127", codProb:"7121"},
  {id:177, orden:177, familia:"Floral / Madera", inspired:"MY WAY PARFUM", fragancia:"DONNA X131", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:178, orden:178, familia:"Floral / Frutal", inspired:"LADY MILLION ROYAL", fragancia:"DONNA X132", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:179, orden:179, familia:"Floral", inspired:"FLOWER BY KENZO L'ABSOLUE", fragancia:"DONNA X133", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:180, orden:180, familia:"Ambar / Floral", inspired:"ANGEL NOVA", fragancia:"DONNA X134", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:181, orden:181, familia:"Floral / Frutal", inspired:"BURBERRY HER", fragancia:"DONNA X135", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:182, orden:182, familia:"Chipre / Frutal", inspired:"OLYMPÉA BLOSSOM", fragancia:"DONNA X136", tipo:"EDP", tapa:"FLUO", genero:"DONNA", cod100:"—", codProb:"—"},
  {id:200, orden:200, familia:"Chipre / Fresco", inspired:"CK ONE", fragancia:"XX", tipo:"EDT", tapa:"COLORS", genero:"UNISEX", cod100:"400", codProb:"6000"},
  {id:201, orden:201, familia:"Chipre / Fresco", inspired:"L'EAU D'ISSEY", fragancia:"UOMO 02", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"402", codProb:"6002"},
  {id:202, orden:202, familia:"Chipre / Fresco", inspired:"KENZO POUR HOMME", fragancia:"UOMO 03", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"403", codProb:"6003"},
  {id:203, orden:203, familia:"Chipre / Fresh", inspired:"ACQUA DI GIO", fragancia:"UOMO 05", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"405", codProb:"6005"},
  {id:204, orden:204, familia:"Chipre / Fresco", inspired:"FAHRENHEIT", fragancia:"UOMO 06", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"406", codProb:"6006"},
  {id:205, orden:205, familia:"Chipre / Fresco", inspired:"212 MEN", fragancia:"UOMO 07", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"407", codProb:"6007"},
  {id:206, orden:206, familia:"Chipre / Cuero", inspired:"POLO", fragancia:"UOMO 08", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"408", codProb:"6008"},
  {id:207, orden:207, familia:"Oriental / Especiado", inspired:"ANGEL", fragancia:"UOMO 15", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"415", codProb:"6015"},
  {id:208, orden:208, familia:"Chipre / Cítrico", inspired:"POLO BLUE", fragancia:"UOMO 17", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"417", codProb:"6017"},
  {id:209, orden:209, familia:"Chipre / Cítrico", inspired:"HUGO", fragancia:"UOMO 18", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"418", codProb:"6018"},
  {id:210, orden:210, familia:"Oriental / Especiado", inspired:"L'BLUE D'ISSEY", fragancia:"UOMO 19", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"419", codProb:"6019"},
  {id:211, orden:211, familia:"Fougere / Madera", inspired:"POLO BLACK", fragancia:"UOMO 21", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"421", codProb:"6021"},
  {id:212, orden:212, familia:"Oriental / Especiado", inspired:"CODE", fragancia:"UOMO 22", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"422", codProb:"6022"},
  {id:213, orden:213, familia:"Fougere / Madera", inspired:"XS BLACK", fragancia:"UOMO 23", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"423", codProb:"6023"},
  {id:214, orden:214, familia:"Oriental / Ambarado", inspired:"212 SEXY", fragancia:"UOMO 24", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"424", codProb:"6024"},
  {id:215, orden:215, familia:"Madera / Especiado", inspired:"1 MILLON", fragancia:"UOMO 37", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"437", codProb:"6037"},
  {id:216, orden:216, familia:"Madera / Floral", inspired:"CH", fragancia:"UOMO 43", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"443", codProb:"6043"},
  {id:217, orden:217, familia:"Oriental / Madera", inspired:"212 VIP", fragancia:"UOMO 59", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"459", codProb:"6059"},
  {id:218, orden:218, familia:"Madera / Acuático", inspired:"INVICTUS", fragancia:"UOMO 64", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"464", codProb:"6064"},
  {id:219, orden:219, familia:"Madera / Especiado", inspired:"POLO RED", fragancia:"UOMO 66", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"466", codProb:"6066"},
  {id:220, orden:220, familia:"Fougere / Aromático", inspired:"DIOR SAUVAGE", fragancia:"UOMO 68", tipo:"EDT", tapa:"COLORS", genero:"UOMO", cod100:"468", codProb:"6068"},
  {id:230, orden:230, familia:"Floral / Dulce", inspired:"RED DOOR", fragancia:"DONNA 01", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"1", codProb:"5601"},
  {id:231, orden:231, familia:"Floral / Fresco", inspired:"5th AVENUE", fragancia:"DONNA 02", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"2", codProb:"5602"},
  {id:232, orden:232, familia:"Floral / Dulce", inspired:"PLEASURES", fragancia:"DONNA 03", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"3", codProb:"5603"},
  {id:233, orden:233, familia:"Floral / Fruity - Fresh", inspired:"C. H. 212", fragancia:"DONNA 04", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"4", codProb:"5604"},
  {id:234, orden:234, familia:"Floral / Fresco", inspired:"KENZO D'ETE", fragancia:"DONNA 05", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"5", codProb:"5605"},
  {id:235, orden:235, familia:"Floral / Frutal", inspired:"L'EAU D'ISSEY", fragancia:"DONNA 06", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"6", codProb:"5606"},
  {id:236, orden:236, familia:"Chipre / Fresco", inspired:"L'EAU PAR KENZO", fragancia:"DONNA 07", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"7", codProb:"5607"},
  {id:237, orden:237, familia:"Floral / Fresco", inspired:"ACQUA DI GIO", fragancia:"DONNA 08", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"8", codProb:"5608"},
  {id:238, orden:238, familia:"Floral", inspired:"FLOWERS", fragancia:"DONNA 09", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"9", codProb:"5609"},
  {id:239, orden:239, familia:"Floral / Frutal", inspired:"RALPH LAUREN", fragancia:"DONNA 11", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"11", codProb:"5611"},
  {id:240, orden:240, familia:"Floral", inspired:"TOMMY GIRL", fragancia:"DONNA 12", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"12", codProb:"5612"},
  {id:241, orden:241, familia:"Oriental", inspired:"ANGEL", fragancia:"DONNA 13", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"13", codProb:"5613"},
  {id:242, orden:242, familia:"Floral / Aldehydic", inspired:"HALLOWEEN", fragancia:"DONNA 19", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"19", codProb:"5619"},
  {id:243, orden:243, familia:"Floral", inspired:"ULTRAVIOLET", fragancia:"DONNA 20", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"20", codProb:"5620"},
  {id:244, orden:244, familia:"Floral / Acuático", inspired:"COOL WATER", fragancia:"DONNA 21", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"21", codProb:"5621"},
  {id:245, orden:245, familia:"Floral / Verde", inspired:"CABOTINE", fragancia:"DONNA 23", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"23", codProb:"5623"},
  {id:246, orden:246, familia:"Floral / Frutal", inspired:"VERY IRRESISTIBLE", fragancia:"DONNA 26", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"26", codProb:"5626"},
  {id:247, orden:247, familia:"Floral / Frutal", inspired:"AMOR AMOR", fragancia:"DONNA 28", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"28", codProb:"5628"},
  {id:248, orden:248, familia:"Floral / Frutal", inspired:"C.H. 212 SEXY", fragancia:"DONNA 32", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"32", codProb:"5632"},
  {id:249, orden:249, familia:"Ambarado / Dulce", inspired:"K. AMOUR", fragancia:"DONNA 36", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"36", codProb:"5636"},
  {id:250, orden:250, familia:"Floral / Verde", inspired:"J'ADORE", fragancia:"DONNA 37", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"37", codProb:"5637"},
  {id:251, orden:251, familia:"Floral / Frutal", inspired:"D&G LIGHT BLUE", fragancia:"DONNA 39", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"39", codProb:"5639"},
  {id:252, orden:252, familia:"Floral / Oriental", inspired:"CH", fragancia:"DONNA 41", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"41", codProb:"5641"},
  {id:253, orden:253, familia:"Floral / Dulce", inspired:"ANGEL Y DEMONIO", fragancia:"DONNA 42", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"42", codProb:"5642"},
  {id:254, orden:254, familia:"Floral / Frutal", inspired:"NINA", fragancia:"DONNA 46", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"46", codProb:"5646"},
  {id:255, orden:255, familia:"Floral", inspired:"ANGEL O' DEMON LE SECRET", fragancia:"DONNA 53", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"53", codProb:"5653"},
  {id:256, orden:256, familia:"Floral / Madera", inspired:"LADY MILLION", fragancia:"DONNA 59", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"59", codProb:"5659"},
  {id:257, orden:257, familia:"Oriental / Madera", inspired:"212 VIP", fragancia:"DONNA 66", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"66", codProb:"5666"},
  {id:258, orden:258, familia:"Oriental / Floral", inspired:"LA VIDA ES BELLA", fragancia:"DONNA 73", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"73", codProb:"5673"},
  {id:259, orden:259, familia:"Chipre / Frutal", inspired:"212 VIP ROSE", fragancia:"DONNA 75", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"75", codProb:"5675"},
  {id:260, orden:260, familia:"Chipre / Frutal", inspired:"SI", fragancia:"DONNA 76", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"76", codProb:"5676"},
  {id:261, orden:261, familia:"Oriental / Floral", inspired:"OLYMPEA", fragancia:"DONNA 81", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"81", codProb:"5681"},
  {id:262, orden:262, familia:"Floral / Frutal", inspired:"LA VIDA ES BELLA FLORAL", fragancia:"DONNA 84", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"84", codProb:"5684"},
  {id:263, orden:263, familia:"Oriental / Floral", inspired:"GOOD GIRL", fragancia:"DONNA 87", tipo:"EDT", tapa:"COLORS", genero:"DONNA", cod100:"387", codProb:"5687"},
];

const GC = {
  DONNA:{accent:"#c76b98",glow:"rgba(199,107,152,0.15)"},
  UOMO:{accent:"#6b8ec7",glow:"rgba(107,142,199,0.15)"},
  UNISEX:{accent:"#6bc79e",glow:"rgba(107,199,158,0.15)"},
};
const TE = {STRIPE:"▬",TAG:"◆",HAWAII:"🌺",FLOWERS:"✿",TRAVEL:"✈",NEON:"◈",BLACK:"●",PRIVE:"♛",FLUO:"◉",COLORS:"🎨"};
const fmt = n => n.toLocaleString("es-AR",{minimumFractionDigits:2,maximumFractionDigits:2});
const EC = {nombre:"",direccion:"",mail:"",codPostal:"",telefono:"",cuit:"",detalle:"",fecha:new Date().toISOString().slice(0,10)};
const EP = {precioEDP:"",precioEDT:"",precioProbEDP:"",precioProbEDT:"",descuento:"0",iva:"21",descTransf:"0",metodoPago:"mercadopago",mpLink:""};

const loadOrders = async () => { try { const r = localStorage.getItem("sng-orders"); return r ? JSON.parse(r) : []; } catch { return []; } };
const saveOrders = async (orders) => { try { localStorage.setItem("sng-orders", JSON.stringify(orders)); } catch(e) { console.error(e); } };

export default function App() {
  const [view, setView] = useState("catalog");
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [fG, setFG] = useState("ALL");
  const [fT, setFT] = useState("ALL");
  const [fTa, setFTa] = useState("ALL");
  const [cli, setCli] = useState({...EC});
  const [exp, setExp] = useState(null);
  const [pre, setPre] = useState({...EP});
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrder, setViewOrder] = useState(null);
  const [logoUrl, setLogoUrl] = useState("/logo-sng.png");
  const [outOfStock, setOutOfStock] = useState({});
  const [stockSearch, setStockSearch] = useState("");
  const [stockFilterG, setStockFilterG] = useState("ALL");

  useEffect(() => { loadOrders().then(o => { setSaved(o); setLoading(false); }); }, []);
  // Persist logo & stock
  useEffect(() => { try { const l = localStorage.getItem("sng-logo"); if(l) setLogoUrl(l); const s = localStorage.getItem("sng-stock"); if(s) setOutOfStock(JSON.parse(s)); } catch{} }, []);
  useEffect(() => { try { localStorage.setItem("sng-logo", logoUrl); } catch{} }, [logoUrl]);
  useEffect(() => { try { localStorage.setItem("sng-stock", JSON.stringify(outOfStock)); } catch{} }, [outOfStock]);

  const toggleStock = (pid) => setOutOfStock(p => { const n={...p}; if(n[pid]) delete n[pid]; else n[pid]=true; return n; });
  const isOOS = (pid) => !!outOfStock[pid];

  const upCart = (pid, sz, d) => setCart(p => { const k=`${pid}_${sz}`,c=p[k]||0,n=Math.max(0,c+d); if(!n){const x={...p};delete x[k];return x;} return {...p,[k]:n}; });
  const gQ = (pid, sz) => cart[`${pid}_${sz}`]||0;
  const gT = pid => gQ(pid,"100")+gQ(pid,"prob");

  const items = useMemo(() => {
    const r=[];
    Object.entries(cart).forEach(([k,q])=>{const[pid,sz]=k.split("_");const p=PRODUCTS.find(x=>x.id===+pid);if(p)r.push({...p,size:sz,qty:q});});
    return r;
  },[cart]);

  const tot = useMemo(()=>{
    let e1=0,t1=0,ep=0,tp=0;
    items.forEach(i=>{if(i.tipo==="EDP"&&i.size==="100")e1+=i.qty;if(i.tipo==="EDT"&&i.size==="100")t1+=i.qty;if(i.tipo==="EDP"&&i.size==="prob")ep+=i.qty;if(i.tipo==="EDT"&&i.size==="prob")tp+=i.qty;});
    return {edp100:e1,edt100:t1,edpProb:ep,edtProb:tp,total100:e1+t1,totalProb:ep+tp,totalAll:e1+t1+ep+tp};
  },[items]);

  // Precios con IVA incluido -> desglose
  const fac = useMemo(()=>{
    const pe=+(pre.precioEDP)||0, pt=+(pre.precioEDT)||0, ppe=+(pre.precioProbEDP)||0, ppt=+(pre.precioProbEDT)||0;
    const iva=+(pre.iva)||0;
    // Precios cargados con IVA, desglosar
    const divIva = 1 + iva/100;
    const totalBrutoEDP = tot.edp100*pe + tot.edpProb*ppe;
    const totalBrutoEDT = tot.edt100*pt + tot.edtProb*ppt;
    const totalBruto = totalBrutoEDP + totalBrutoEDT;
    const desc = +(pre.descuento)||0;
    const afterDesc = totalBruto * (1 - desc/100);
    // Desglose IVA: el precio ya incluye IVA
    const neto = afterDesc / divIva;
    const ivaAmount = afterDesc - neto;
    const descTr = +(pre.descTransf)||0;
    const finalTotal = afterDesc * (1 - descTr/100);
    const finalNeto = finalTotal / divIva;
    const finalIva = finalTotal - finalNeto;
    return {totalBrutoEDP,totalBrutoEDT,totalBruto,desc,afterDesc,neto,ivaAmount,iva,descTr,finalTotal,finalNeto,finalIva,pe,pt,ppe,ppt};
  },[pre,tot]);

  const filtered = useMemo(()=>{
    return PRODUCTS.filter(p=>{
      if(fG!=="ALL"&&p.genero!==fG)return false;if(fT!=="ALL"&&p.tipo!==fT)return false;if(fTa!=="ALL"&&p.tapa!==fTa)return false;
      if(search){const q=search.toLowerCase();return p.inspired.toLowerCase().includes(q)||p.fragancia.toLowerCase().includes(q)||p.familia.toLowerCase().includes(q)||p.cod100.toLowerCase().includes(q);}
      return true;
    }).sort((a,b)=>a.orden-b.orden);
  },[search,fG,fT,fTa]);

  const tapas = useMemo(()=>[...new Set(PRODUCTS.filter(p=>(fG==="ALL"||p.genero===fG)&&(fT==="ALL"||p.tipo===fT)).map(p=>p.tapa))],[fG,fT]);
  const grouped = useMemo(()=>{const g={};filtered.forEach(p=>{const k=`${p.genero} — ${p.tipo}`;if(!g[k])g[k]=[];g[k].push(p);});return g;},[filtered]);

  // WhatsApp share
  const shareWhatsApp = (od) => {
    const d = od || {cli,items,tot,fac,pre};
    const c = d.cli || cli;
    const ci = d.items || items;
    const t = d.tot || tot;
    const f = d.fac || fac;
    const p = d.pre || pre;
    let msg = `*PEDIDO SNG*\n`;
    msg += `👤 ${c.nombre||"—"}\n📅 ${c.fecha}\n`;
    if(c.telefono) msg += `📱 ${c.telefono}\n`;
    if(c.direccion) msg += `📍 ${c.direccion}\n`;
    msg += `\n`;
    const i100 = ci.filter(i=>i.size==="100");
    const iP = ci.filter(i=>i.size==="prob");
    if(i100.length){
      msg += `*── FRAGANCIAS 100 ML ──*\n`;
      i100.forEach(i=>{ msg += `${i.qty}× ${i.fragancia} · ${i.tipo}\n   _${i.inspired}_\n`; });
    }
    if(iP.length){
      msg += `\n*── PROBADORES 10 ML ──*\n`;
      iP.forEach(i=>{ msg += `${i.qty}× ${i.fragancia} · ${i.tipo}\n   _${i.inspired}_\n`; });
    }
    msg += `\n*RESUMEN*\n`;
    msg += `Fragancias 100ml: ${t.total100}\n`;
    msg += `Probadores 10ml: ${t.totalProb}\n`;
    msg += `Total unidades: ${t.totalAll}\n`;
    if(f.totalBruto>0){
      msg += `\n*FACTURACIÓN*\n`;
      msg += `Total con IVA: $${fmt(f.afterDesc)}\n`;
      msg += `  Neto: $${fmt(f.neto)}\n`;
      msg += `  IVA ${f.iva}%: $${fmt(f.ivaAmount)}\n`;
      if(f.descTr>0) msg += `Desc. ${p.metodoPago==="mercadopago"?"Mercado Pago":"Transf/Dep"} ${f.descTr}%: -$${fmt(f.afterDesc-f.finalTotal)}\n`;
      msg += `\n💰 *TOTAL A PAGAR: $${fmt(f.finalTotal)}*\n`;
      msg += `\n📌 Método de pago: ${p.metodoPago==="mercadopago"?"Mercado Pago":"Depósito/Transferencia"}\n`;
      if(p.metodoPago==="mercadopago"&&p.mpLink) msg += `🔗 Link de pago: ${p.mpLink}\n`;
    }
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url,"_blank");
  };

  // Save as PDF (print dialog with save as PDF option)
  const savePDF = (od) => {
    const d = od || {cli,items,tot,fac,pre};
    const c = d.cli||cli, ci = d.items||items, t = d.tot||tot, f = d.fac||fac;
    const i100=ci.filter(i=>i.size==="100"), iP=ci.filter(i=>i.size==="prob");
    const w = window.open("","_blank");
    if(!w){alert("Permitir ventanas emergentes para guardar PDF");return;}
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Pedido SNG - ${c.nombre||"Pedido"}</title><style>
      *{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:11px;color:#111;padding:12px}
      h1{font-size:16px;text-align:center;margin-bottom:4px}
      .sub{text-align:center;font-size:10px;color:#666;margin-bottom:8px}
      h2{font-size:12px;margin:8px 0 4px;border-bottom:2px solid #111;padding-bottom:2px}
      .info{display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;margin:4px 0 8px;font-size:10px}.info b{font-weight:bold}
      table{width:100%;border-collapse:collapse;margin-bottom:6px;font-size:9px}
      th{background:#222;color:#fff;padding:2px 4px;text-align:left;font-size:8px}
      td{padding:2px 4px;border-bottom:1px solid #ddd}tr:nth-child(even){background:#f5f5f5}
      .tot{margin-top:6px;border:2px solid #111;padding:6px}.tot table{margin:0}.tot td{border:none;padding:2px 4px;font-size:10px}
      .big{font-size:13px;font-weight:bold;background:#ff0}
      .pago{margin-top:6px;padding:6px;background:#f0f0f0;border:1px solid #ccc;font-size:10px}
      @media print{body{padding:4mm}@page{margin:6mm;size:A4}}
    </style></head><body>
    <h1>PEDIDO SNG</h1>
    <div class="sub">Guardar como PDF: Ctrl+P → Destino: "Guardar como PDF"</div>
    <div class="info">
      <div><b>Nombre:</b> ${c.nombre}</div><div><b>Fecha:</b> ${c.fecha}</div>
      <div><b>Dirección:</b> ${c.direccion}</div><div><b>CP:</b> ${c.codPostal}</div>
      <div><b>Teléfono:</b> ${c.telefono}</div><div><b>Mail:</b> ${c.mail}</div>
      <div><b>CUIT/DNI:</b> ${c.cuit}</div><div><b>Detalle:</b> ${c.detalle}</div>
    </div>`);
    if(i100.length){
      w.document.write(`<h2>FRAGANCIAS 100 ML</h2><table><tr><th>#</th><th>Fragancia</th><th>Inspiración</th><th>Tipo</th><th>Tapa</th><th>Cód</th><th>Cant</th></tr>`);
      i100.forEach((it,i)=>w.document.write(`<tr><td>${i+1}</td><td>${it.fragancia}</td><td>${it.inspired}</td><td>${it.tipo}</td><td>${it.tapa}</td><td>${it.cod100}</td><td style="font-weight:bold;text-align:center">${it.qty}</td></tr>`));
      w.document.write(`</table>`);
    }
    if(iP.length){
      w.document.write(`<h2>PROBADORES 10 ML</h2><table><tr><th>#</th><th>Fragancia</th><th>Inspiración</th><th>Tipo</th><th>Tapa</th><th>Cód</th><th>Cant</th></tr>`);
      iP.forEach((it,i)=>w.document.write(`<tr><td>${i+1}</td><td>${it.fragancia}</td><td>${it.inspired}</td><td>${it.tipo}</td><td>${it.tapa}</td><td>${it.codProb}</td><td style="font-weight:bold;text-align:center">${it.qty}</td></tr>`));
      w.document.write(`</table>`);
    }
    w.document.write(`<div class="tot"><table>
      <tr><td colspan="2" style="font-weight:bold;font-size:11px;padding-bottom:4px">PRECIOS UNITARIOS (con IVA)</td></tr>
      ${f.pe>0?`<tr><td>EDP 100ml c/u</td><td style="text-align:right">$${fmt(f.pe)}</td></tr>`:''}
      ${f.pt>0?`<tr><td>EDT 100ml c/u</td><td style="text-align:right">$${fmt(f.pt)}</td></tr>`:''}
      ${f.ppe>0?`<tr><td>Probador EDP c/u</td><td style="text-align:right">$${fmt(f.ppe)}</td></tr>`:''}
      ${f.ppt>0?`<tr><td>Probador EDT c/u</td><td style="text-align:right">$${fmt(f.ppt)}</td></tr>`:''}
      <tr><td colspan="2" style="border-top:1px solid #111"></td></tr>
      <tr><td>EDP 100ml</td><td style="text-align:right;font-weight:bold">${t.edp100}</td></tr>
      <tr><td>EDT 100ml</td><td style="text-align:right;font-weight:bold">${t.edt100}</td></tr>
      <tr><td>Total 100ml</td><td style="text-align:right;font-weight:bold">${t.total100}</td></tr>
      <tr><td>Prob EDP</td><td style="text-align:right;font-weight:bold">${t.edpProb}</td></tr>
      <tr><td>Prob EDT</td><td style="text-align:right;font-weight:bold">${t.edtProb}</td></tr>
      <tr><td>Total Prob</td><td style="text-align:right;font-weight:bold">${t.totalProb}</td></tr>
      <tr><td colspan="2" style="border-top:1px solid #111"></td></tr>
      <tr><td>Total c/IVA EDP</td><td style="text-align:right">$${fmt(f.totalBrutoEDP)}</td></tr>
      <tr><td>Total c/IVA EDT</td><td style="text-align:right">$${fmt(f.totalBrutoEDT)}</td></tr>
      <tr><td>Sub Total</td><td style="text-align:right;font-weight:bold">$${fmt(f.totalBruto)}</td></tr>
      ${f.desc>0?`<tr><td>Descuento ${f.desc}%</td><td style="text-align:right">-$${fmt(f.totalBruto-f.afterDesc)}</td></tr>`:''}
      <tr><td>Neto</td><td style="text-align:right">$${fmt(f.neto)}</td></tr>
      <tr><td>IVA ${f.iva}%</td><td style="text-align:right">$${fmt(f.ivaAmount)}</td></tr>
      ${f.descTr>0?`<tr><td>Desc. Transf/Dep ${f.descTr}%</td><td style="text-align:right">-$${fmt(f.afterDesc-f.finalTotal)}</td></tr>`:''}
      <tr class="big"><td>TOTAL A PAGAR</td><td style="text-align:right">$${fmt(f.finalTotal)}</td></tr>
    </table></div>`);
    const mp = d.pre?.metodoPago || pre.metodoPago;
    const ml = d.pre?.mpLink || pre.mpLink;
    w.document.write(`<div class="pago"><b>Método de pago:</b> ${mp==="mercadopago"?"Mercado Pago":"Depósito / Transferencia"}${mp==="mercadopago"&&ml?` | <a href="${ml}">Link de pago</a>`:''}</div>`);
    w.document.write(`</body></html>`);
    w.document.close();
    setTimeout(()=>w.print(),400);
  };

  // Print directly (no save dialog)
  const printOrder = (od) => {
    const d = od || {cli,items,tot,fac,pre};
    const c = d.cli||cli, ci = d.items||items, t = d.tot||tot, f = d.fac||fac;
    const i100=ci.filter(i=>i.size==="100"), iP=ci.filter(i=>i.size==="prob");
    if(!ci.length){alert("No hay productos");return;}
    const w = window.open("","_blank");
    if(!w){alert("Permitir ventanas emergentes para imprimir");return;}
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Pedido SNG - ${c.nombre||"Pedido"}</title><style>
      *{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:11px;color:#111;padding:12px}
      h1{font-size:16px;text-align:center;margin-bottom:4px}
      h2{font-size:12px;margin:8px 0 4px;border-bottom:2px solid #111;padding-bottom:2px}
      .info{display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;margin:4px 0 8px;font-size:10px}.info b{font-weight:bold}
      table{width:100%;border-collapse:collapse;margin-bottom:6px;font-size:9px}
      th{background:#222;color:#fff;padding:2px 4px;text-align:left;font-size:8px}
      td{padding:2px 4px;border-bottom:1px solid #ddd}tr:nth-child(even){background:#f5f5f5}
      .tot{margin-top:6px;border:2px solid #111;padding:6px}.tot table{margin:0}.tot td{border:none;padding:2px 4px;font-size:10px}
      .big{font-size:13px;font-weight:bold;background:#ff0}
      .pago{margin-top:6px;padding:6px;background:#f0f0f0;border:1px solid #ccc;font-size:10px}
      @media print{body{padding:4mm}@page{margin:6mm;size:A4}}
    </style></head><body><h1>PEDIDO SNG</h1><div class="info">
      <div><b>Nombre:</b> ${c.nombre}</div><div><b>Fecha:</b> ${c.fecha}</div>
      <div><b>Dirección:</b> ${c.direccion}</div><div><b>CP:</b> ${c.codPostal}</div>
      <div><b>Teléfono:</b> ${c.telefono}</div><div><b>Mail:</b> ${c.mail}</div>
      <div><b>CUIT/DNI:</b> ${c.cuit}</div><div><b>Detalle:</b> ${c.detalle}</div>
    </div>`);
    if(i100.length){
      w.document.write(`<h2>FRAGANCIAS 100 ML</h2><table><tr><th>#</th><th>Fragancia</th><th>Inspiración</th><th>Tipo</th><th>Tapa</th><th>Cód</th><th>Cant</th></tr>`);
      i100.forEach((it,i)=>w.document.write(`<tr><td>${i+1}</td><td>${it.fragancia}</td><td>${it.inspired}</td><td>${it.tipo}</td><td>${it.tapa}</td><td>${it.cod100}</td><td style="font-weight:bold;text-align:center">${it.qty}</td></tr>`));
      w.document.write(`</table>`);
    }
    if(iP.length){
      w.document.write(`<h2>PROBADORES 10 ML</h2><table><tr><th>#</th><th>Fragancia</th><th>Inspiración</th><th>Tipo</th><th>Tapa</th><th>Cód</th><th>Cant</th></tr>`);
      iP.forEach((it,i)=>w.document.write(`<tr><td>${i+1}</td><td>${it.fragancia}</td><td>${it.inspired}</td><td>${it.tipo}</td><td>${it.tapa}</td><td>${it.codProb}</td><td style="font-weight:bold;text-align:center">${it.qty}</td></tr>`));
      w.document.write(`</table>`);
    }
    w.document.write(`<div class="tot"><table>
      ${f.pe>0||f.pt>0||f.ppe>0||f.ppt>0?`<tr><td colspan="2" style="font-weight:bold;font-size:11px;padding-bottom:4px">PRECIOS UNITARIOS (con IVA)</td></tr>
      ${f.pe>0?`<tr><td>EDP 100ml c/u</td><td style="text-align:right">$${fmt(f.pe)}</td></tr>`:''}
      ${f.pt>0?`<tr><td>EDT 100ml c/u</td><td style="text-align:right">$${fmt(f.pt)}</td></tr>`:''}
      ${f.ppe>0?`<tr><td>Probador EDP c/u</td><td style="text-align:right">$${fmt(f.ppe)}</td></tr>`:''}
      ${f.ppt>0?`<tr><td>Probador EDT c/u</td><td style="text-align:right">$${fmt(f.ppt)}</td></tr>`:''}
      <tr><td colspan="2" style="border-top:1px solid #111"></td></tr>`:''}
      <tr><td>Total 100ml</td><td style="text-align:right;font-weight:bold">${t.total100}</td></tr>
      <tr><td>Total Prob</td><td style="text-align:right;font-weight:bold">${t.totalProb}</td></tr>
      <tr><td colspan="2" style="border-top:1px solid #111"></td></tr>
      ${f.totalBruto>0?`<tr><td>Neto</td><td style="text-align:right">$${fmt(f.neto)}</td></tr>
      <tr><td>IVA ${f.iva}%</td><td style="text-align:right">$${fmt(f.ivaAmount)}</td></tr>
      ${f.desc>0?`<tr><td>Desc ${f.desc}%</td><td style="text-align:right">-$${fmt(f.totalBruto-f.afterDesc)}</td></tr>`:''}
      ${f.descTr>0?`<tr><td>Desc pago ${f.descTr}%</td><td style="text-align:right">-$${fmt(f.afterDesc-f.finalTotal)}</td></tr>`:''}
      <tr class="big"><td>TOTAL</td><td style="text-align:right">$${fmt(f.finalTotal)}</td></tr>`:''}
    </table></div>`);
    const mp = d.pre?.metodoPago || pre.metodoPago;
    const ml = d.pre?.mpLink || pre.mpLink;
    if(f.totalBruto>0) w.document.write(`<div class="pago"><b>Pago:</b> ${mp==="mercadopago"?"Mercado Pago":"Depósito / Transferencia"}${mp==="mercadopago"&&ml?` | <a href="${ml}">Link MP</a>`:''}</div>`);
    w.document.write(`</body></html>`);
    w.document.close();
    setTimeout(()=>w.print(),300);
  };

  const handleSave = async () => {
    if(!tot.totalAll){alert("No hay productos");return;}
    const order = {id:Date.now().toString(),savedAt:new Date().toISOString(),cli:{...cli},pre:{...pre},cart:{...cart},
      items:items.map(i=>({id:i.id,inspired:i.inspired,fragancia:i.fragancia,tipo:i.tipo,tapa:i.tapa,genero:i.genero,cod100:i.cod100,codProb:i.codProb,familia:i.familia,size:i.size,qty:i.qty})),
      tot:{...tot},fac:{...fac}};
    const up = [order,...saved];
    setSaved(up); await saveOrders(up);
    setCart({}); setCli({...EC}); setView("archivo");
  };

  const handleDel = async (oid) => {
    const up=saved.filter(o=>o.id!==oid); setSaved(up); await saveOrders(up);
    if(viewOrder?.id===oid)setViewOrder(null);
  };

  const handleLoad = (o) => { setCart(o.cart); setCli(o.cli); setPre(o.pre); setViewOrder(null); setView("cart"); };

  const B = (a,c="#c76b98")=>({fontFamily:"Outfit",fontSize:11,letterSpacing:1,padding:"6px 14px",borderRadius:16,border:a?`1px solid ${c}`:"1px solid rgba(255,255,255,0.08)",background:a?`${c}22`:"transparent",color:a?c:"#8a7e75",cursor:"pointer",textTransform:"uppercase",transition:"all 0.2s"});
  const SB = (bg,cl,bd)=>({fontFamily:"Outfit",fontSize:9,padding:"5px 12px",borderRadius:10,border:`1px solid ${bd}`,background:bg,color:cl,cursor:"pointer",letterSpacing:1,textTransform:"uppercase"});

  return (
    <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",minHeight:"100vh",background:"linear-gradient(145deg,#0d0d0d 0%,#1a1117 40%,#0d1117 100%)",color:"#e8e0d8"}}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet"/>
      {/* HEADER */}
      <div style={{background:"linear-gradient(180deg,rgba(199,107,152,0.08) 0%,transparent 100%)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"14px 12px",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(20px)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {logoUrl && <img src={logoUrl} alt="Logo" style={{height:36,width:36,objectFit:"contain",borderRadius:6}} onError={()=>setLogoUrl("")}/>}
            <div>
              <h1 style={{fontSize:20,fontWeight:300,letterSpacing:6,textTransform:"uppercase",margin:0,background:"linear-gradient(135deg,#c76b98,#d4a574)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SNG</h1>
              <p style={{fontFamily:"Outfit",fontSize:9,letterSpacing:3,textTransform:"uppercase",color:"#8a7e75",margin:"2px 0 0"}}>Toma de Pedido</p>
            </div>
          </div>
          <div style={{display:"flex",gap:3,flexWrap:"wrap",justifyContent:"flex-end"}}>
            {[{v:"catalog",l:"Catálogo"},{v:"cart",l:"Pedido"},{v:"precios",l:"Precios"},{v:"cliente",l:"Cliente"},{v:"stock",l:"Stock"},{v:"archivo",l:"Archivo"}].map(t=>(
              <button key={t.v} onClick={()=>{setView(t.v);setViewOrder(null)}} style={{fontFamily:"Outfit",fontSize:9,letterSpacing:1,textTransform:"uppercase",padding:"5px 8px",borderRadius:14,border:view===t.v?"1px solid rgba(199,107,152,0.5)":"1px solid rgba(255,255,255,0.1)",background:view===t.v?"rgba(199,107,152,0.15)":"rgba(255,255,255,0.03)",color:view===t.v?"#c76b98":"#8a7e75",cursor:"pointer",position:"relative"}}>
                {t.l}
                {t.v==="cart"&&tot.totalAll>0&&<span style={{position:"absolute",top:-4,right:-4,background:"#c76b98",color:"#fff",borderRadius:"50%",width:14,height:14,fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Outfit"}}>{tot.totalAll}</span>}
                {t.v==="stock"&&Object.keys(outOfStock).length>0&&<span style={{position:"absolute",top:-4,right:-4,background:"#c76060",color:"#fff",borderRadius:"50%",width:14,height:14,fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Outfit"}}>{Object.keys(outOfStock).length}</span>}
                {t.v==="archivo"&&saved.length>0&&<span style={{position:"absolute",top:-4,right:-4,background:"#d4a574",color:"#fff",borderRadius:"50%",width:14,height:14,fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Outfit"}}>{saved.length}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 12px 100px"}}>

      {/* ===== CATALOG ===== */}
      {view==="catalog"&&(<div>
        <div style={{margin:"14px 0 10px",position:"relative"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar fragancia, inspiración, código..." style={{width:"100%",boxSizing:"border-box",padding:"12px 16px 12px 36px",fontFamily:"Outfit",fontSize:13,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"#e8e0d8",outline:"none"}}/>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,opacity:0.4}}>⌕</span>
          {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8a7e75",cursor:"pointer",fontSize:14}}>✕</button>}
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
          {[{l:"Todos",v:"ALL"},{l:"Donna",v:"DONNA"},{l:"Uomo",v:"UOMO"},{l:"Unisex",v:"UNISEX"}].map(f=>(
            <button key={f.v} onClick={()=>{setFG(f.v);setFTa("ALL")}} style={B(fG===f.v,f.v!=="ALL"?GC[f.v]?.accent:"#c76b98")}>{f.l}</button>
          ))}
          <div style={{width:1,background:"rgba(255,255,255,0.08)",margin:"0 2px"}}/>
          {["ALL","EDP","EDT"].map(t=>(
            <button key={t} onClick={()=>{setFT(t);setFTa("ALL")}} style={B(fT===t,"#d4a574")}>{t==="ALL"?"Todos":t}</button>
          ))}
        </div>
        {tapas.length>1&&(
          <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:12,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
            <button onClick={()=>setFTa("ALL")} style={{fontFamily:"Outfit",fontSize:9,padding:"3px 8px",borderRadius:10,border:fTa==="ALL"?"1px solid rgba(255,255,255,0.2)":"1px solid rgba(255,255,255,0.06)",background:fTa==="ALL"?"rgba(255,255,255,0.08)":"transparent",color:fTa==="ALL"?"#e8e0d8":"#6a6058",cursor:"pointer"}}>Todas</button>
            {tapas.map(t=>(<button key={t} onClick={()=>setFTa(t)} style={{fontFamily:"Outfit",fontSize:9,padding:"3px 8px",borderRadius:10,border:fTa===t?"1px solid rgba(255,255,255,0.2)":"1px solid rgba(255,255,255,0.06)",background:fTa===t?"rgba(255,255,255,0.08)":"transparent",color:fTa===t?"#e8e0d8":"#6a6058",cursor:"pointer"}}>{TE[t]||""} {t}</button>))}
          </div>
        )}
        <p style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",marginBottom:10}}>{filtered.length} fragancias</p>
        {Object.entries(grouped).map(([group,prods])=>(
          <div key={group} style={{marginBottom:20}}>
            <div style={{fontFamily:"Outfit",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#6a6058",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",marginBottom:6}}>{group} ({prods.length})</div>
            {prods.map(p=>{
              const gc=GC[p.genero]||GC.UNISEX,qty=gT(p.id),isE=exp===p.id,oos=isOOS(p.id);
              return(<div key={p.id} style={{marginBottom:1,opacity:oos?0.4:1}}>
                <div onClick={()=>setExp(isE?null:p.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:8,background:qty>0?gc.glow:oos?"rgba(200,80,80,0.05)":"transparent",border:qty>0?`1px solid ${gc.accent}33`:oos?"1px solid rgba(200,80,80,0.15)":"1px solid transparent",cursor:"pointer",transition:"all 0.2s"}}>
                  <div style={{width:3,height:28,borderRadius:2,background:oos?"#c76060":qty>0?gc.accent:"rgba(255,255,255,0.06)"}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"Outfit",fontSize:12,fontWeight:500,color:oos?"#8a7e75":"#fff",letterSpacing:0.3}}>{p.fragancia} · {p.familia} · {TE[p.tapa]} {p.tapa} {oos&&<span style={{fontSize:9,color:"#c76060",fontWeight:600}}>SIN STOCK</span>}</div>
                    <div style={{fontFamily:"Outfit",fontSize:10,color:"#8a7e75",marginTop:1}}>{p.inspired}</div>
                  </div>
                  {qty>0&&<span style={{fontFamily:"Outfit",fontSize:11,fontWeight:600,color:gc.accent,background:`${gc.accent}22`,padding:"2px 8px",borderRadius:8}}>{qty}</span>}
                  <span style={{fontSize:10,color:"#6a6058",transform:isE?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
                </div>
                {isE&&(
                  <div style={{padding:"6px 10px 10px 22px",display:"flex",gap:8,flexWrap:"wrap",animation:"fadeIn 0.2s"}}>
                    {[["100","100 ML","#d4a574"],["prob","Prob 10 ML","#8a7e75"]].map(([sz,lb,col])=>(
                      <div key={sz} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"6px 10px",border:"1px solid rgba(255,255,255,0.06)",flex:"1 1 140px"}}>
                        <span style={{fontFamily:"Outfit",fontSize:11,color:col,fontWeight:500,flex:1}}>{lb}</span>
                        <button onClick={e=>{e.stopPropagation();upCart(p.id,sz,-1)}} style={{width:28,height:28,borderRadius:6,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.03)",color:"#8a7e75",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                        <span style={{fontFamily:"Outfit",fontSize:15,fontWeight:600,width:28,textAlign:"center",color:gQ(p.id,sz)>0?gc.accent:"#4a4440"}}>{gQ(p.id,sz)}</span>
                        <button onClick={e=>{e.stopPropagation();upCart(p.id,sz,1)}} style={{width:28,height:28,borderRadius:6,border:`1px solid ${gc.accent}44`,background:`${gc.accent}11`,color:gc.accent,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>);
            })}
          </div>
        ))}
      </div>)}

      {/* ===== CART ===== */}
      {view==="cart"&&(<div style={{paddingTop:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,gap:6,flexWrap:"wrap"}}>
          <h2 style={{fontWeight:300,fontSize:18,letterSpacing:3,textTransform:"uppercase",margin:0}}>Pedido</h2>
          {tot.totalAll>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            <button onClick={handleSave} style={SB("rgba(107,199,158,0.12)","#6bc79e","rgba(107,199,158,0.4)")}>💾 Guardar</button>
            <button onClick={()=>savePDF()} style={SB("rgba(199,107,152,0.12)","#c76b98","rgba(199,107,152,0.4)")}>📄 PDF</button>
            <button onClick={()=>printOrder()} style={SB("rgba(212,165,116,0.12)","#d4a574","rgba(212,165,116,0.4)")}>🖨 Imprimir</button>
            <button onClick={()=>shareWhatsApp()} style={SB("rgba(37,211,102,0.12)","#25d366","rgba(37,211,102,0.4)")}>📲 WhatsApp</button>
          </div>}
        </div>
        {!tot.totalAll?(
          <div style={{textAlign:"center",padding:"50px 20px",color:"#6a6058"}}>
            <div style={{fontSize:36,marginBottom:10,opacity:0.3}}>✦</div>
            <p style={{fontFamily:"Outfit",fontSize:12}}>No hay productos en el pedido</p>
            <button onClick={()=>setView("catalog")} style={{fontFamily:"Outfit",marginTop:14,padding:"8px 20px",borderRadius:16,border:"1px solid rgba(199,107,152,0.3)",background:"rgba(199,107,152,0.1)",color:"#c76b98",cursor:"pointer",fontSize:11,letterSpacing:1}}>IR AL CATÁLOGO</button>
          </div>
        ):(<>
          {/* Cart items - same new format: fragancia big, inspired small */}
          {items.filter(i=>i.size==="100").length>0&&(<>
            <div style={{fontFamily:"Outfit",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#d4a574",marginBottom:6,paddingBottom:4,borderBottom:"1px solid rgba(212,165,116,0.2)"}}>Fragancias 100 ML</div>
            {items.filter(i=>i.size==="100").map(it=>{const gc=GC[it.genero]||GC.UNISEX;return(
              <div key={`${it.id}_100`} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:2,borderRadius:8,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)"}}>
                <div style={{width:3,height:30,borderRadius:2,background:gc.accent}}/>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"Outfit",fontSize:12,fontWeight:500,color:"#fff"}}>{it.fragancia} · {it.tipo} · {TE[it.tapa]} {it.tapa}</div>
                  <div style={{fontFamily:"Outfit",fontSize:10,color:"#8a7e75"}}>{it.inspired}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <button onClick={()=>upCart(it.id,"100",-1)} style={{width:24,height:24,borderRadius:5,border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:"#8a7e75",cursor:"pointer",fontSize:14}}>−</button>
                  <span style={{fontFamily:"Outfit",fontSize:13,fontWeight:600,color:gc.accent,width:22,textAlign:"center"}}>{it.qty}</span>
                  <button onClick={()=>upCart(it.id,"100",1)} style={{width:24,height:24,borderRadius:5,border:`1px solid ${gc.accent}44`,background:`${gc.accent}11`,color:gc.accent,cursor:"pointer",fontSize:14}}>+</button>
                </div>
              </div>
            );})}
          </>)}
          {items.filter(i=>i.size==="prob").length>0&&(<>
            <div style={{fontFamily:"Outfit",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#8a7e75",margin:"14px 0 6px",paddingBottom:4,borderBottom:"1px solid rgba(255,255,255,0.08)"}}>Probadores 10 ML</div>
            {items.filter(i=>i.size==="prob").map(it=>{const gc=GC[it.genero]||GC.UNISEX;return(
              <div key={`${it.id}_prob`} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:2,borderRadius:8,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)"}}>
                <div style={{width:3,height:30,borderRadius:2,background:gc.accent,opacity:0.5}}/>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"Outfit",fontSize:12,fontWeight:500,color:"#fff"}}>{it.fragancia} · {it.tipo} · {TE[it.tapa]} {it.tapa}</div>
                  <div style={{fontFamily:"Outfit",fontSize:10,color:"#8a7e75"}}>{it.inspired}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <button onClick={()=>upCart(it.id,"prob",-1)} style={{width:24,height:24,borderRadius:5,border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:"#8a7e75",cursor:"pointer",fontSize:14}}>−</button>
                  <span style={{fontFamily:"Outfit",fontSize:13,fontWeight:600,color:gc.accent,width:22,textAlign:"center"}}>{it.qty}</span>
                  <button onClick={()=>upCart(it.id,"prob",1)} style={{width:24,height:24,borderRadius:5,border:`1px solid ${gc.accent}44`,background:`${gc.accent}11`,color:gc.accent,cursor:"pointer",fontSize:14}}>+</button>
                </div>
              </div>
            );})}
          </>)}
          {/* Summary */}
          <div style={{marginTop:18,padding:16,borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
            <div style={{fontFamily:"Outfit",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#8a7e75",marginBottom:10}}>Resumen</div>
            {[["EDP 100ml",tot.edp100],["EDT 100ml",tot.edt100],["Total 100ml",tot.total100],null,["Prob EDP",tot.edpProb],["Prob EDT",tot.edtProb],["Total Prob",tot.totalProb],null,["TOTAL GENERAL",tot.totalAll]].map((r,i)=>r===null?<div key={i} style={{height:1,background:"rgba(255,255,255,0.06)",margin:"6px 0"}}/>:(
              <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontFamily:"Outfit",fontSize:12,color:r[0].startsWith("Total")||r[0].startsWith("TOTAL")?"#e8e0d8":"#8a7e75",fontWeight:r[0].startsWith("TOTAL")?"600":"400"}}>{r[0]}</span>
                <span style={{fontFamily:"Outfit",fontSize:13,fontWeight:r[0].startsWith("TOTAL")?"700":"500",color:r[0].startsWith("TOTAL")?"#c76b98":"#d4a574"}}>{r[1]}</span>
              </div>
            ))}
          </div>
          {fac.totalBruto>0&&(
            <div style={{marginTop:10,padding:16,borderRadius:12,background:"linear-gradient(135deg,rgba(199,107,152,0.06),rgba(212,165,116,0.06))",border:"1px solid rgba(199,107,152,0.12)"}}>
              <div style={{fontFamily:"Outfit",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#c76b98",marginBottom:8}}>Facturación (precios con IVA)</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginBottom:8}}>
                {fac.pe>0&&<div style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",padding:"4px 8px",background:"rgba(255,255,255,0.02)",borderRadius:6}}>EDP 100ml: <span style={{color:"#d4a574"}}>${fmt(fac.pe)}</span> c/u</div>}
                {fac.pt>0&&<div style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",padding:"4px 8px",background:"rgba(255,255,255,0.02)",borderRadius:6}}>EDT 100ml: <span style={{color:"#d4a574"}}>${fmt(fac.pt)}</span> c/u</div>}
                {fac.ppe>0&&<div style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",padding:"4px 8px",background:"rgba(255,255,255,0.02)",borderRadius:6}}>EDP Prob: <span style={{color:"#d4a574"}}>${fmt(fac.ppe)}</span> c/u</div>}
                {fac.ppt>0&&<div style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",padding:"4px 8px",background:"rgba(255,255,255,0.02)",borderRadius:6}}>EDT Prob: <span style={{color:"#d4a574"}}>${fmt(fac.ppt)}</span> c/u</div>}
              </div>
              {[["Total EDP",fac.totalBrutoEDP],["Total EDT",fac.totalBrutoEDT],["Sub Total",fac.totalBruto]].map(([l,v],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:"Outfit",fontSize:12,color:"#8a7e75"}}>{l}</span><span style={{fontFamily:"Outfit",fontSize:12,color:"#e8e0d8"}}>${fmt(v)}</span></div>
              ))}
              {fac.desc>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:"Outfit",fontSize:12,color:"#8a7e75"}}>Descuento {fac.desc}%</span><span style={{fontFamily:"Outfit",fontSize:12,color:"#6bc79e"}}>-${fmt(fac.totalBruto-fac.afterDesc)}</span></div>}
              <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"6px 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:"Outfit",fontSize:11,color:"#6a6058"}}>Neto (sin IVA)</span><span style={{fontFamily:"Outfit",fontSize:11,color:"#8a7e75"}}>${fmt(fac.neto)}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:"Outfit",fontSize:11,color:"#6a6058"}}>IVA {fac.iva}%</span><span style={{fontFamily:"Outfit",fontSize:11,color:"#d4a574"}}>${fmt(fac.ivaAmount)}</span></div>
              {fac.descTr>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:"Outfit",fontSize:12,color:"#8a7e75"}}>Desc. {pre.metodoPago==="mercadopago"?"MP":"Transf"} {fac.descTr}%</span><span style={{fontFamily:"Outfit",fontSize:12,color:"#6bc79e"}}>-${fmt(fac.afterDesc-fac.finalTotal)}</span></div>}
              <div style={{height:2,background:"rgba(199,107,152,0.2)",margin:"8px 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"Outfit",fontSize:14,fontWeight:600,color:"#e8e0d8"}}>TOTAL A PAGAR</span><span style={{fontFamily:"Outfit",fontSize:16,fontWeight:700,color:"#c76b98"}}>${fmt(fac.finalTotal)}</span></div>
            </div>
          )}
          <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
            <button onClick={handleSave} style={{fontFamily:"Outfit",padding:"8px 18px",borderRadius:14,border:"1px solid rgba(107,199,158,0.4)",background:"rgba(107,199,158,0.12)",color:"#6bc79e",cursor:"pointer",fontSize:10,letterSpacing:1,textTransform:"uppercase"}}>💾 Guardar y Nuevo</button>
            <button onClick={()=>printOrder()} style={{fontFamily:"Outfit",padding:"8px 18px",borderRadius:14,border:"1px solid rgba(212,165,116,0.4)",background:"rgba(212,165,116,0.12)",color:"#d4a574",cursor:"pointer",fontSize:10,letterSpacing:1,textTransform:"uppercase"}}>🖨 Imprimir</button>
            <button onClick={()=>shareWhatsApp()} style={{fontFamily:"Outfit",padding:"8px 18px",borderRadius:14,border:"1px solid rgba(37,211,102,0.4)",background:"rgba(37,211,102,0.12)",color:"#25d366",cursor:"pointer",fontSize:10,letterSpacing:1,textTransform:"uppercase"}}>📲 WhatsApp</button>
            <button onClick={()=>setCart({})} style={{fontFamily:"Outfit",padding:"6px 14px",borderRadius:14,border:"1px solid rgba(200,80,80,0.3)",background:"rgba(200,80,80,0.08)",color:"#c76060",cursor:"pointer",fontSize:10,letterSpacing:1,textTransform:"uppercase"}}>Vaciar</button>
          </div>
        </>)}
      </div>)}

      {/* ===== PRECIOS ===== */}
      {view==="precios"&&(<div style={{paddingTop:14}}>
        <h2 style={{fontWeight:300,fontSize:18,letterSpacing:3,textTransform:"uppercase",marginBottom:18}}>Precios y Facturación</h2>
        <div style={{fontFamily:"Outfit",fontSize:10,color:"#d4a574",marginBottom:14,padding:"8px 12px",borderRadius:8,background:"rgba(212,165,116,0.08)",border:"1px solid rgba(212,165,116,0.15)"}}>💡 Los precios se cargan CON IVA incluido. El desglose se calcula automáticamente.</div>
        {[{k:"precioEDP",l:"Precio Unitario EDP 100ml (con IVA)",p:"Ej: 15000"},{k:"precioEDT",l:"Precio Unitario EDT 100ml (con IVA)",p:"Ej: 12000"},{k:"precioProbEDP",l:"Precio Probador EDP 10ml (con IVA)",p:"Ej: 3000"},{k:"precioProbEDT",l:"Precio Probador EDT 10ml (con IVA)",p:"Ej: 2500"}].map(f=>(
          <div key={f.k} style={{marginBottom:14}}>
            <label style={{fontFamily:"Outfit",fontSize:10,letterSpacing:1,textTransform:"uppercase",color:"#8a7e75",display:"block",marginBottom:3}}>{f.l}</label>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontFamily:"Outfit",fontSize:14,color:"#6a6058"}}>$</span>
              <input type="number" value={pre[f.k]} onChange={e=>setPre({...pre,[f.k]:e.target.value})} placeholder={f.p} style={{width:"100%",boxSizing:"border-box",padding:"12px 14px 12px 28px",fontFamily:"Outfit",fontSize:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"#e8e0d8",outline:"none"}}/>
            </div>
          </div>
        ))}
        <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"20px 0"}}/>
        {[{k:"descuento",l:"Descuento general %",p:"0"},{k:"iva",l:"IVA % (incluido en precios)",p:"21"},{k:"descTransf",l:"Descuento por pago %",p:"0"}].map(f=>(
          <div key={f.k} style={{marginBottom:14}}>
            <label style={{fontFamily:"Outfit",fontSize:10,letterSpacing:1,textTransform:"uppercase",color:"#8a7e75",display:"block",marginBottom:3}}>{f.l}</label>
            <div style={{position:"relative"}}>
              <input type="number" value={pre[f.k]} onChange={e=>setPre({...pre,[f.k]:e.target.value})} placeholder={f.p} style={{width:"100%",boxSizing:"border-box",padding:"12px 14px",fontFamily:"Outfit",fontSize:14,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"#e8e0d8",outline:"none"}}/>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontFamily:"Outfit",fontSize:14,color:"#6a6058"}}>%</span>
            </div>
          </div>
        ))}
        {/* Método de pago */}
        <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"20px 0"}}/>
        <div style={{fontFamily:"Outfit",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#8a7e75",marginBottom:10}}>Método de Pago</div>
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {[{v:"mercadopago",l:"Mercado Pago",em:"💳"},{v:"transferencia",l:"Depósito / Transferencia",em:"🏦"}].map(m=>(
            <button key={m.v} onClick={()=>setPre({...pre,metodoPago:m.v})} style={{flex:1,fontFamily:"Outfit",fontSize:11,padding:"10px 12px",borderRadius:10,border:pre.metodoPago===m.v?"1px solid rgba(199,107,152,0.5)":"1px solid rgba(255,255,255,0.08)",background:pre.metodoPago===m.v?"rgba(199,107,152,0.12)":"rgba(255,255,255,0.03)",color:pre.metodoPago===m.v?"#c76b98":"#8a7e75",cursor:"pointer",textAlign:"center"}}>{m.em} {m.l}</button>
          ))}
        </div>
        {pre.metodoPago==="mercadopago"&&(
          <div style={{marginBottom:14}}>
            <label style={{fontFamily:"Outfit",fontSize:10,letterSpacing:1,textTransform:"uppercase",color:"#8a7e75",display:"block",marginBottom:3}}>Link de Mercado Pago (opcional)</label>
            <input type="url" value={pre.mpLink} onChange={e=>setPre({...pre,mpLink:e.target.value})} placeholder="https://mpago.la/..." style={{width:"100%",boxSizing:"border-box",padding:"12px 14px",fontFamily:"Outfit",fontSize:13,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"#e8e0d8",outline:"none"}}/>
          </div>
        )}
        {/* Vista previa facturación */}
        {tot.totalAll>0&&fac.totalBruto>0&&(
          <div style={{marginTop:20,padding:16,borderRadius:12,background:"linear-gradient(135deg,rgba(199,107,152,0.08),rgba(212,165,116,0.08))",border:"1px solid rgba(199,107,152,0.15)"}}>
            <div style={{fontFamily:"Outfit",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#c76b98",marginBottom:10}}>Vista previa</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div style={{padding:10,borderRadius:8,background:"rgba(255,255,255,0.03)"}}>
                <div style={{fontFamily:"Outfit",fontSize:9,color:"#6a6058",textTransform:"uppercase"}}>EDP ({tot.edp100}×100ml + {tot.edpProb}×prob)</div>
                <div style={{fontFamily:"Outfit",fontSize:16,fontWeight:600,color:"#d4a574"}}>${fmt(fac.totalBrutoEDP)}</div>
              </div>
              <div style={{padding:10,borderRadius:8,background:"rgba(255,255,255,0.03)"}}>
                <div style={{fontFamily:"Outfit",fontSize:9,color:"#6a6058",textTransform:"uppercase"}}>EDT ({tot.edt100}×100ml + {tot.edtProb}×prob)</div>
                <div style={{fontFamily:"Outfit",fontSize:16,fontWeight:600,color:"#d4a574"}}>${fmt(fac.totalBrutoEDT)}</div>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"Outfit",fontSize:12,color:"#8a7e75"}}>Sub Total (con IVA)</span><span style={{fontFamily:"Outfit",fontSize:12,color:"#e8e0d8"}}>${fmt(fac.totalBruto)}</span></div>
            {fac.desc>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"Outfit",fontSize:12,color:"#8a7e75"}}>Descuento {fac.desc}%</span><span style={{fontFamily:"Outfit",fontSize:12,color:"#6bc79e"}}>-${fmt(fac.totalBruto-fac.afterDesc)}</span></div>}
            <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"6px 0"}}/>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:"Outfit",fontSize:11,color:"#6a6058"}}>Neto (sin IVA)</span><span style={{fontFamily:"Outfit",fontSize:11,color:"#8a7e75"}}>${fmt(fac.neto)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:"Outfit",fontSize:11,color:"#6a6058"}}>IVA {fac.iva}%</span><span style={{fontFamily:"Outfit",fontSize:11,color:"#d4a574"}}>${fmt(fac.ivaAmount)}</span></div>
            {fac.descTr>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"Outfit",fontSize:12,color:"#8a7e75"}}>Desc. pago {fac.descTr}%</span><span style={{fontFamily:"Outfit",fontSize:12,color:"#6bc79e"}}>-${fmt(fac.afterDesc-fac.finalTotal)}</span></div>}
            <div style={{height:2,background:"rgba(199,107,152,0.3)",margin:"8px 0"}}/>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"Outfit",fontSize:15,fontWeight:700,color:"#e8e0d8"}}>TOTAL A PAGAR</span><span style={{fontFamily:"Outfit",fontSize:18,fontWeight:700,color:"#c76b98"}}>${fmt(fac.finalTotal)}</span></div>
            <div style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",marginTop:6}}>Pago: {pre.metodoPago==="mercadopago"?"💳 Mercado Pago":"🏦 Depósito / Transferencia"}</div>
          </div>
        )}
        {/* Logo config */}
        <div style={{marginTop:24,padding:16,borderRadius:12,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{fontFamily:"Outfit",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#8a7e75",marginBottom:10}}>Logo / Imagen de la App</div>
          <p style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",marginBottom:8}}>Pegá la URL de tu logo (aparece en el header y en los PDFs)</p>
          <input type="url" value={logoUrl} onChange={e=>setLogoUrl(e.target.value)} placeholder="https://ejemplo.com/mi-logo.png" style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",fontFamily:"Outfit",fontSize:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"#e8e0d8",outline:"none"}}/>
          {logoUrl&&<div style={{marginTop:10,display:"flex",alignItems:"center",gap:10}}>
            <img src={logoUrl} alt="Preview" style={{height:48,borderRadius:8,background:"rgba(255,255,255,0.05)",padding:4}} onError={(e)=>{e.target.style.display="none"}}/>
            <button onClick={()=>setLogoUrl("")} style={{fontFamily:"Outfit",fontSize:9,padding:"4px 10px",borderRadius:8,border:"1px solid rgba(200,80,80,0.3)",background:"transparent",color:"#c76060",cursor:"pointer"}}>Quitar</button>
          </div>}
        </div>
      </div>)}

      {/* ===== CLIENTE ===== */}
      {view==="cliente"&&(<div style={{paddingTop:14}}>
        <h2 style={{fontWeight:300,fontSize:18,letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Datos del Cliente</h2>
        {[{k:"nombre",l:"Nombre",p:"Nombre completo"},{k:"direccion",l:"Dirección",p:"Dirección de entrega"},{k:"codPostal",l:"Código Postal",p:"CP"},{k:"telefono",l:"Teléfono",p:"Teléfono de contacto"},{k:"mail",l:"Email",p:"correo@ejemplo.com"},{k:"cuit",l:"CUIT / DNI",p:"Nro de documento"},{k:"fecha",l:"Fecha",p:"",t:"date"}].map(f=>(
          <div key={f.k} style={{marginBottom:12}}>
            <label style={{fontFamily:"Outfit",fontSize:10,letterSpacing:1,textTransform:"uppercase",color:"#8a7e75",display:"block",marginBottom:3}}>{f.l}</label>
            <input type={f.t||"text"} value={cli[f.k]} onChange={e=>setCli({...cli,[f.k]:e.target.value})} placeholder={f.p} style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",fontFamily:"Outfit",fontSize:13,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"#e8e0d8",outline:"none"}}/>
          </div>
        ))}
        <div style={{marginBottom:12}}>
          <label style={{fontFamily:"Outfit",fontSize:10,letterSpacing:1,textTransform:"uppercase",color:"#8a7e75",display:"block",marginBottom:3}}>Detalle / Observaciones</label>
          <textarea value={cli.detalle} onChange={e=>setCli({...cli,detalle:e.target.value})} rows={3} style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",fontFamily:"Outfit",fontSize:13,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"#e8e0d8",outline:"none",resize:"vertical"}}/>
        </div>
        {tot.totalAll>0&&(
          <div style={{marginTop:20,padding:16,borderRadius:12,background:"linear-gradient(135deg,rgba(199,107,152,0.08),rgba(212,165,116,0.08))",border:"1px solid rgba(199,107,152,0.15)"}}>
            <div style={{fontFamily:"Outfit",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"#c76b98",marginBottom:8}}>Resumen del Pedido</div>
            <div style={{fontFamily:"Outfit",fontSize:12,color:"#8a7e75",marginBottom:3}}>{cli.nombre||"Sin nombre"}</div>
            <div style={{fontFamily:"Outfit",fontSize:20,fontWeight:600,color:"#e8e0d8"}}>{tot.total100} <span style={{fontSize:12,fontWeight:400,color:"#8a7e75"}}>fragancias 100ml</span> + {tot.totalProb} <span style={{fontSize:12,fontWeight:400,color:"#8a7e75"}}>probadores</span></div>
            {fac.finalTotal>0&&<div style={{fontFamily:"Outfit",fontSize:14,fontWeight:600,color:"#c76b98",marginTop:6}}>Total: ${fmt(fac.finalTotal)}</div>}
            <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
              <button onClick={handleSave} style={{fontFamily:"Outfit",padding:"8px 18px",borderRadius:16,border:"1px solid rgba(107,199,158,0.4)",background:"rgba(107,199,158,0.12)",color:"#6bc79e",cursor:"pointer",fontSize:11,letterSpacing:1,textTransform:"uppercase"}}>💾 Guardar y Nuevo</button>
              <button onClick={()=>savePDF()} style={{fontFamily:"Outfit",padding:"8px 18px",borderRadius:16,border:"1px solid rgba(199,107,152,0.4)",background:"rgba(199,107,152,0.12)",color:"#c76b98",cursor:"pointer",fontSize:11,letterSpacing:1,textTransform:"uppercase"}}>📄 PDF</button>
              <button onClick={()=>printOrder()} style={{fontFamily:"Outfit",padding:"8px 18px",borderRadius:16,border:"1px solid rgba(212,165,116,0.4)",background:"rgba(212,165,116,0.12)",color:"#d4a574",cursor:"pointer",fontSize:11,letterSpacing:1,textTransform:"uppercase"}}>🖨 Imprimir</button>
              <button onClick={()=>shareWhatsApp()} style={{fontFamily:"Outfit",padding:"8px 18px",borderRadius:16,border:"1px solid rgba(37,211,102,0.4)",background:"rgba(37,211,102,0.12)",color:"#25d366",cursor:"pointer",fontSize:11,letterSpacing:1,textTransform:"uppercase"}}>📲 WhatsApp</button>
            </div>
          </div>
        )}
      </div>)}

      {/* ===== STOCK ===== */}
      {view==="stock"&&(<div style={{paddingTop:14}}>
        <h2 style={{fontWeight:300,fontSize:18,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>Control de Stock</h2>
        <p style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",marginBottom:14}}>Marcá las fragancias que no tenés en stock. Aparecen tachadas en el catálogo.</p>
        <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
          <input value={stockSearch} onChange={e=>setStockSearch(e.target.value)} placeholder="Buscar..." style={{flex:1,minWidth:150,padding:"10px 14px",fontFamily:"Outfit",fontSize:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"#e8e0d8",outline:"none"}}/>
          {["ALL","DONNA","UOMO","UNISEX"].map(g=>(<button key={g} onClick={()=>setStockFilterG(g)} style={B(stockFilterG===g,g!=="ALL"?GC[g]?.accent:"#c76b98")}>{g==="ALL"?"Todos":g}</button>))}
        </div>
        {Object.keys(outOfStock).length>0&&<div style={{fontFamily:"Outfit",fontSize:10,color:"#c76060",marginBottom:10,padding:"6px 10px",borderRadius:8,background:"rgba(200,80,80,0.08)",border:"1px solid rgba(200,80,80,0.15)"}}>
          ⚠ {Object.keys(outOfStock).length} producto{Object.keys(outOfStock).length>1?"s":""} sin stock
          <button onClick={()=>setOutOfStock({})} style={{marginLeft:10,fontFamily:"Outfit",fontSize:9,padding:"2px 8px",borderRadius:6,border:"1px solid rgba(200,80,80,0.3)",background:"transparent",color:"#c76060",cursor:"pointer"}}>Limpiar todo</button>
        </div>}
        {PRODUCTS.filter(p=>{
          if(stockFilterG!=="ALL"&&p.genero!==stockFilterG)return false;
          if(stockSearch){const q=stockSearch.toLowerCase();return p.fragancia.toLowerCase().includes(q)||p.inspired.toLowerCase().includes(q)||p.familia.toLowerCase().includes(q);}
          return true;
        }).sort((a,b)=>a.orden-b.orden).map(p=>{
          const gc=GC[p.genero]||GC.UNISEX, oos=isOOS(p.id);
          return(<div key={p.id} onClick={()=>toggleStock(p.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",marginBottom:1,borderRadius:8,background:oos?"rgba(200,80,80,0.08)":"transparent",border:oos?"1px solid rgba(200,80,80,0.2)":"1px solid transparent",cursor:"pointer",transition:"all 0.15s"}}>
            <div style={{width:22,height:22,borderRadius:6,border:oos?"2px solid #c76060":"2px solid rgba(255,255,255,0.15)",background:oos?"#c76060":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
              {oos&&<span style={{color:"#fff",fontSize:13,fontWeight:700}}>✕</span>}
            </div>
            <div style={{width:3,height:24,borderRadius:2,background:gc.accent,opacity:oos?0.3:1}}/>
            <div style={{flex:1,opacity:oos?0.5:1}}>
              <div style={{fontFamily:"Outfit",fontSize:11,fontWeight:500,color:oos?"#8a7e75":"#fff",textDecoration:oos?"line-through":"none"}}>{p.fragancia} · {p.tipo} · {TE[p.tapa]} {p.tapa}</div>
              <div style={{fontFamily:"Outfit",fontSize:9,color:"#6a6058"}}>{p.inspired}</div>
            </div>
            {oos&&<span style={{fontFamily:"Outfit",fontSize:8,color:"#c76060",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>SIN STOCK</span>}
          </div>);
        })}
      </div>)}

      {/* ===== ARCHIVO ===== */}
      {view==="archivo"&&(<div style={{paddingTop:14}}>
        <h2 style={{fontWeight:300,fontSize:18,letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Pedidos Guardados</h2>
        {loading?<p style={{fontFamily:"Outfit",fontSize:12,color:"#6a6058"}}>Cargando...</p>:
        viewOrder?(
          <div style={{animation:"fadeIn 0.2s"}}>
            <button onClick={()=>setViewOrder(null)} style={{fontFamily:"Outfit",fontSize:10,padding:"4px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"transparent",color:"#8a7e75",cursor:"pointer",marginBottom:12}}>← Volver</button>
            <div style={{padding:16,borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{fontFamily:"Outfit",fontSize:14,fontWeight:600,color:"#e8e0d8",marginBottom:2}}>{viewOrder.cli.nombre||"Sin nombre"}</div>
              <div style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",marginBottom:12}}>{new Date(viewOrder.savedAt).toLocaleString("es-AR")} · {viewOrder.cli.fecha}</div>
              {viewOrder.items.filter(i=>i.size==="100").length>0&&(<>
                <div style={{fontFamily:"Outfit",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#d4a574",marginBottom:4}}>Fragancias 100 ML</div>
                {viewOrder.items.filter(i=>i.size==="100").map((it,idx)=>(
                  <div key={idx} style={{fontFamily:"Outfit",fontSize:11,color:"#e8e0d8",marginBottom:3,paddingLeft:8}}>
                    <span style={{fontWeight:500}}>{it.qty}× {it.fragancia} · {it.tipo}</span>
                    <div style={{fontSize:10,color:"#6a6058",paddingLeft:20}}>{it.inspired}</div>
                  </div>
                ))}
              </>)}
              {viewOrder.items.filter(i=>i.size==="prob").length>0&&(<>
                <div style={{fontFamily:"Outfit",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#8a7e75",margin:"8px 0 4px"}}>Probadores 10 ML</div>
                {viewOrder.items.filter(i=>i.size==="prob").map((it,idx)=>(
                  <div key={idx} style={{fontFamily:"Outfit",fontSize:11,color:"#e8e0d8",marginBottom:3,paddingLeft:8}}>
                    <span style={{fontWeight:500}}>{it.qty}× {it.fragancia} · {it.tipo}</span>
                    <div style={{fontSize:10,color:"#6a6058",paddingLeft:20}}>{it.inspired}</div>
                  </div>
                ))}
              </>)}
              <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"10px 0"}}/>
              <div style={{fontFamily:"Outfit",fontSize:12,color:"#e8e0d8"}}>{viewOrder.tot.total100} fragancias + {viewOrder.tot.totalProb} probadores = <span style={{fontWeight:600,color:"#c76b98"}}>{viewOrder.tot.totalAll} unidades</span></div>
              {viewOrder.fac.finalTotal>0&&(<>
                <div style={{fontFamily:"Outfit",fontSize:11,color:"#6a6058",marginTop:4}}>Neto: ${fmt(viewOrder.fac.neto)} + IVA: ${fmt(viewOrder.fac.ivaAmount)}</div>
                <div style={{fontFamily:"Outfit",fontSize:16,fontWeight:700,color:"#c76b98",marginTop:4}}>Total: ${fmt(viewOrder.fac.finalTotal)}</div>
              </>)}
              <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
                <button onClick={()=>savePDF(viewOrder)} style={SB("rgba(199,107,152,0.12)","#c76b98","rgba(199,107,152,0.4)")}>📄 PDF</button>
                <button onClick={()=>printOrder(viewOrder)} style={SB("rgba(212,165,116,0.12)","#d4a574","rgba(212,165,116,0.4)")}>🖨 Imprimir</button>
                <button onClick={()=>shareWhatsApp(viewOrder)} style={SB("rgba(37,211,102,0.12)","#25d366","rgba(37,211,102,0.4)")}>📲 WhatsApp</button>
                <button onClick={()=>handleLoad(viewOrder)} style={SB("rgba(212,165,116,0.12)","#d4a574","rgba(212,165,116,0.4)")}>📥 Cargar</button>
                <button onClick={()=>handleDel(viewOrder.id)} style={SB("rgba(200,80,80,0.08)","#c76060","rgba(200,80,80,0.3)")}>🗑 Eliminar</button>
              </div>
            </div>
          </div>
        ):(
          saved.length===0?(
            <div style={{textAlign:"center",padding:"50px 20px",color:"#6a6058"}}>
              <div style={{fontSize:36,marginBottom:10,opacity:0.3}}>📁</div>
              <p style={{fontFamily:"Outfit",fontSize:12}}>No hay pedidos guardados</p>
              <p style={{fontFamily:"Outfit",fontSize:10,color:"#4a4440",marginTop:6}}>Cargá un pedido desde el catálogo y tocá "Guardar" para archivarlo acá.</p>
            </div>
          ):(
            <div>
              <p style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058",marginBottom:12}}>{saved.length} pedido{saved.length>1?"s":""} guardado{saved.length>1?"s":""}</p>
              {saved.map(o=>(
                <div key={o.id} onClick={()=>setViewOrder(o)} style={{padding:"12px 14px",marginBottom:6,borderRadius:10,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",cursor:"pointer",transition:"all 0.2s"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontFamily:"Outfit",fontSize:13,fontWeight:500,color:"#e8e0d8"}}>{o.cli.nombre||"Sin nombre"}</div>
                      <div style={{fontFamily:"Outfit",fontSize:10,color:"#6a6058"}}>{new Date(o.savedAt).toLocaleDateString("es-AR")} · {o.tot.totalAll} unidades</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      {o.fac.finalTotal>0&&<div style={{fontFamily:"Outfit",fontSize:14,fontWeight:600,color:"#c76b98"}}>${fmt(o.fac.finalTotal)}</div>}
                      <div style={{fontFamily:"Outfit",fontSize:9,color:"#6a6058"}}>{o.tot.total100} frag + {o.tot.totalProb} prob</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>)}

      </div>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
        input::placeholder,textarea::placeholder{color:#4a4440}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
        input[type=number]{-moz-appearance:textfield}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:4px}
        *{box-sizing:border-box}
      `}</style>
    </div>
  );
}
