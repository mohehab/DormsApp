﻿import { jsPDF } from "jspdf"
var font = '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EZccLoYSANMCAAEABgAIAAoAGgAqADsATABcAG0AfgCQAJMAowCzAMMA1QDlAPUBBQEVASYBNwFHAVcBcAF/AY4BngGuAb0BzQHdAe4CAgITAiQCMwJCAlECYAJvAoACjwKeAq0CvALMAtwC6wL6AxMDLANEA10DdQOEA5IDpwO1A8QD0wPpBAEEEgQkBEIEUARfBG0EfASKBJkEqAS4BMYE1ATiBPAE/gUOBRwFKgU4BUYFVQVkBXIFgAWWBaQFwAXUBe4F/gYWBi0GPQZNBl0GbwZ/Bo4GnwauBrwGzAbaBugG/QcPBywHSgdnB4UHkgedB6cHsAe5B8QHzgfYB+EH7Af3CAEIEAgeCCwINwhLCF8IcgiGCJkIowisCLwIxQjPCNkI4gjsCPUI/wkICRIJHAknCTAJOQlCCUsJVAlfCWwJdQl+CYcJkAmaCaQJrQm2CccJ0AneCewJ+goFChAKGwonCjIKOwpGCk8KWApjCmkKcAp9CpMKqArACtUK4wr0Cv8LCgsSCxwLOAtVC3ILjQupC8UL4gv9DBgMNAxDDE0MVwxhDHYMegyBDMAMzy5udWxsQ1JfNGJlaGluaXRpYWxhcmFiaWN0ZWhpbml0aWFsYXJhYmljdGhlaGluaXRpYWxhcmFiaWNqZWVtaW5pdGlhbGFyYWJpY2hhaGluaXRpYWxhcmFiaWNraGFoaW5pdGlhbGFyYWJpY3NlZW5pbml0aWFsYXJhYmljc2hlZW5pbml0aWFsYXJhYmljXzEzdGFoaW5pdGlhbGFyYWJpY3phaGluaXRpYWxhcmFiaWNhaW5pbml0aWFsYXJhYmljZ2hhaW5pbml0aWFsYXJhYmljZmVoaW5pdGlhbGFyYWJpY3FhZmluaXRpYWxhcmFiaWNrYWZpbml0aWFsYXJhYmljbGFtaW5pdGlhbGFyYWJpY21lZW1pbml0aWFsYXJhYmljbm9vbmluaXRpYWxhcmFiaWNoZWhpbml0aWFsYXJhYmljeWVoaW5pdGlhbGFyYWJpY3llaGhhbXphYWJvdmVtZWRpYWxhcmFiaWNiZWhtZWRpYWxhcmFiaWN0ZWhtZWRpYWxhcmFiaWN0aGVobWVkaWFsYXJhYmljamVlbW1lZGlhbGFyYWJpY2hhaG1lZGlhbGFyYWJpY2toYWhtZWRpYWxhcmFiaWNzZWVubWVkaWFsYXJhYmljc2hhZGRha2FzcmFhcmFiaWNzaGFkZGFrYXNyYXRhbmFyYWJpY2thc2hpZGFhdXRvYXJhYmljc2hlZW5tZWRpYWxhcmFiaWNzYWRtZWRpYWxhcmFiaWNkYWRtZWRpYWxhcmFiaWN0YWhtZWRpYWxhcmFiaWN6YWhtZWRpYWxhcmFiaWNhaW5tZWRpYWxhcmFiaWNnaGFpbm1lZGlhbGFyYWJpY2ZlaG1lZGlhbGFyYWJpY3FhZm1lZGlhbGFyYWJpY2thZm1lZGlhbGFyYWJpY2xhbW1lZGlhbGFyYWJpY21lZW1tZWRpYWxhcmFiaWNub29ubWVkaWFsYXJhYmljaGVobWVkaWFsYXJhYmljeWVobWVkaWFsYXJhYmljYWxlZm1hZGRhYWJvdmVmaW5hbGFyYWJpY2FsZWZoYW16YWFib3ZlZmluYWxhcmFiaWN3YXdoYW16YWFib3ZlZmluYWxhcmFiaWNhbGVmaGFtemFiZWxvd2ZpbmFsYXJhYmljeWVoaGFtemFhYm92ZWZpbmFsYXJhYmljYWxlZmZpbmFsYXJhYmljYmVoZmluYWxhcmFiaWN0ZWhtYXJidXRhZmluYWxhcmFiaWN0ZWhmaW5hbGFyYWJpY3RoZWhmaW5hbGFyYWJpY2plZW1maW5hbGFyYWJpY2RlY2ltYWxzZXBhcmF0b3JhcmFiaWN0aG91c2FuZHNzZXBhcmF0b3JhcmFiaWNzaGFkZGFmYXRoYWFyYWJpY3NoYWRkYWRhbW1hYXJhYmljWGxhbWFsZWZoYW16YWFib3ZlaXNvbGF0ZWRhcmFiaWhhaGZpbmFsYXJhYmlja2hhaGZpbmFsYXJhYmljZGFsZmluYWxhcmFiaWN0aGFsZmluYWxhcmFiaWNyZWhmaW5hbGFyYWJpY3phaW5maW5hbGFyYWJpY3NlZW5maW5hbGFyYWJpY3NoZWVuZmluYWxhcmFiaWNzYWRmaW5hbGFyYWJpY2RhZGZpbmFsYXJhYmljdGFoZmluYWxhcmFiaWN6YWhmaW5hbGFyYWJpY2FpbmZpbmFsYXJhYmljZ2hhaW5maW5hbGFyYWJpY2ZlaGZpbmFsYXJhYmljcWFmZmluYWxhcmFiaWNrYWZmaW5hbGFyYWJpY2xhbWZpbmFsYXJhYmljbWVlbWZpbmFsYXJhYmljbm9vbmZpbmFsYXJhYmljaGVoZmluYWxhcmFiaWN3YXdmaW5hbGFyYWJpY2FsZWZtYWtzdXJhZmluYWxhcmFiaWN5ZWhmaW5hbGFyYWJpY2xhbWFsZWZtYWRkYWFib3ZlZmluYWxhcmFiaWNzaGFkZGFkYW1tYXRhbmFyYWJpY3llaGhhbXphYWJvdmVpbml0aWFsYXJhYmljZGFkaW5pdGlhbGFyYWJpY2FsZWZtYWtzdXJhaW5pdGlhbGFyYWJpY2FsZWZtYWtzdXJhbWVkaWFsYXJhYmljc2FkaW5pdGlhbGFyYWJpY3BlaGluaXRpYWxhcmFiaWNub25icmVha2luZ3NwYWNldGNoZWhpbml0aWFsYXJhYmljdmVoaW5pdGlhbGFyYWJpY3BlaG1lZGlhbGFyYWJpY3RjaGVobWVkaWFsYXJhYmljdmVobWVkaWFsYXJhYmljcGVoZmluYWxhcmFiaWN0Y2hlaGZpbmFsYXJhYmljdmVoZmluYWxhcmFiaWNqZWhmaW5hbGFyYWJpY2xhbWFsZWZpc29sYXRlZGFyYWJpY2xhbWFsZWZmaW5hbGFyYWJpY2xhbWFsZWZoYW16YWFib3ZlZmluYWxhcmFiaWNYbGFtYWxlZmhhbXphYmVsb3dpc29sYXRlZGFyYWJpbGFtYWxlZmhhbXphYmVsb3dmaW5hbGFyYWJpY1hsYW1hbGVmbWFkZGFhYm92ZWlzb2xhdGVkYXJhYmlwZXJjZW50YXJhYmljY29tbWFhcmFiaWN6ZXJvYXJhYmljb25lYXJhYmljdHdvYXJhYmljdGhyZWVhcmFiaWNmb3VyYXJhYmljZml2ZWFyYWJpY3NpeGFyYWJpY3NldmVuYXJhYmljZWlnaHRhcmFiaWNuaW5lYXJhYmljc2VtaWNvbG9uYXJhYmljcXVlc3Rpb25hcmFiaWNhc3Rlcmlza2FyYWJpY2hhbXphYXJhYmljYWxlZm1hZGRhYWJvdmVhcmFiaWNhbGVmaGFtemFhYm92ZWFyYWJpY3dhd2hhbXphYWJvdmVhcmFiaWNhbGVmaGFtemFiZWxvd2FyYWJpY3llaGhhbXphYWJvdmVhcmFiaWNhbGVmYXJhYmljYmVoYXJhYmljdGVobWFyYnV0YWFyYWJpY3RlaGFyYWJpY3RoZWhhcmFiaWNqZWVtYXJhYmljaGFoYXJhYmlja2hhaGFyYWJpY2RhbGFyYWJpY3RoYWxhcmFiaWNyZWhhcmFiaWN6YWluYXJhYmljc2VlbmFyYWJpY3NoZWVuYXJhYmljc2FkYXJhYmljZGFkYXJhYmljdGFoYXJhYmljemFoYXJhYmljYWluYXJhYmljZ2hhaW5hcmFiaWN0YXR3ZWVsYXJhYmljZmVoYXJhYmljcWFmYXJhYmlja2FmYXJhYmljbGFtYXJhYmljbWVlbWFyYWJpY25vb25hcmFiaWNoZWhhcmFiaWN3YXdhcmFiaWNhbGVmbWFrc3VyYWFyYWJpY3llaGFyYWJpY2ZhdGhhdGFuYXJhYmljZGFtbWF0YW5hcmFiaWNrYXNyYXRhbmFyYWJpY2ZhdGhhYXJhYmljZGFtbWFhcmFiaWNrYXNyYWFyYWJpY3NoYWRkYWFyYWJpY3N1a3VuYXJhYmljcGVoYXJhYmljdGNoZWhhcmFiaWN2ZWhhcmFiaWNqZWhhcmFiaWNoeXBoZW5taW51c2RlbGV0ZW5ic3BhY2VhbGxhaGlzb2xhdGVkb3JuYXRlcmlnaHRwYXJlbnRoZXNpc29ybmF0ZWxlZnRwYXJlbnRoZXNpc2FsZWZ3aXRoZmF0aGF0YW5pc29sYXRlZGFsZWZ3aXRoZmF0aGF0YW5maW5hbGFsZWZ3YXNsYWZpbmFsYWxlZndhc2xhaXNvbGF0ZWRyaWdodHRvbGVmdGxlZnR0b3JpZ2h0emVyb2pvaW56ZXJvbm9qb2luZXh0ZW5kZWRhcmFiaWNpbmRpY2RpZ2l0bmluZWV4dGVuZGVkYXJhYmljaW5kaWNkaWdpdGVpZ2h0ZXh0ZW5kZWRhcmFiaWNpbmRpY2RpZ2l0c2V2ZW5leHRlbmRlZGFyYWJpY2luZGljZGlnaXRzaXhleHRlbmRlZGFyYWJpY2luZGljZGlnaXRmaXZlZXh0ZW5kZWRhcmFiaWNpbmRpY2RpZ2l0Zm91cmV4dGVuZGVkYXJhYmljaW5kaWNkaWdpdHRocmVlZXh0ZW5kZWRhcmFiaWNpbmRpY2RpZ2l0dHdvZXh0ZW5kZWRhcmFiaWNpbmRpY2RpZ2l0b25lZXh0ZW5kZWRhcmFiaWNpbmRpY2RpZ2l0emVyb3N1cGVyc2NyaXB0YWxlZm1hZGRhYWJvdmVoYW16YWFib3ZlaGFtemFiZWxv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AAEAAQABAxoAAQABAAEDGAABAAEAAQNmAAEAAQABA5gAAQV+AAMADAAmADAAAwAIAA4AFACWAAIA8gCXAAIA8wCZAAIA9AABAAQAmAACAPMAAQAEAJoAAgDzAAEFTgAGABIAHAAmADAAOgBEAAEABABdAAIAxAABAAQAIwACAMQAAQAEAEEAAgDEAAEABABCAAIAxAABAAQAIgACAMQABQAMABIAGAAeACQAXQACAL8AIwACAMAAQQACAMEAQgACAMIAIgACAMMAAQTWAAMADAAuADgABAAKABAAFgAcAN8AAgC+AJYAAgDyAJcAAgDzAJkAAgD0AAEABACYAAIA8wABAAQAmgACAPMAAQSeAAYAEgAcACYAMAA6AEQAAQAEAF0AAgDEAAEABAAjAAIAxAABAAQAQQACAMQAAQAEAEIAAgDEAAEABAAiAAIAxAAFAAwAEgAYAB4AJABdAAIAvwAjAAIAwABBAAIAwQBCAAIAwgAiAAIAwwABBDoAAgAKACwABAAKABAAFgAcAHYAAgA0AEMAAgA1AHQAAgA3AHAAAgA5AAQACgAQABYAHABcAAIANABzAAIANQB1AAIANwBxAAIAOQABA/QAAQAIAAEABADcAAMALwBYAAED2AACAAoANgAFAAwAFAAaACAAJgDcAAMALwBYAHYAAgA0AEMAAgA1AHQAAgA3AHAAAgA5AAQACgAQABYAHABcAAIANABzAAIANQB1AAIANwBxAAIAOQABA44AAQAIAAEABADgAAIAvgABA2QABgASABwAJgAwADoARAABAAQAXQACAMQAAQAEACMAAgDEAAEABABBAAIAxAABAAQAQgACAMQAAQAEACIAAgDEAAUADAASABgAHgAkAF0AAgC/ACMAAgDAAEEAAgDBAEIAAgDCACIAAgDDAAEDAAACAAoALAAEAAoAEAAWABwAdgACADQAQwACADUAdAACADcAcAACADkABAAKABAAFgAcAFwAAgA0AHMAAgA1AHUAAgA3AHEAAgA5AAECugABAAgAAQAEANwAAwAvAFgAAQKyAAAAAQLOAAAAAgLSACgANAA1ADYANwA4ADkAOgA7ADwAPQA+AEQARQBGAEcASABJAEoASwBMAE0ATgBPAFAAUQBSAFMAVABVAFYAVwBYAFkAWgBbAGsAbABtAG4A4QACAp4AGgAaABsAHAAdAB4AHwAgACEAJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMAZwBoAGoAAgJkABoAXgAFAAYABwAIAAkACgALAAwAYgBfAA4ADwAQABEAEgATABQAFQAWABcAGAAZAGMAZQBmAAECWAAAAAECAgAoAFYAXABiAGgAbgB4AH4AiACOAJgAogCsALYAwADGAMwA0gDYAOIA7AD2AQABCgEUAR4BKAEyATwBRgFQAVoBZAFuAXQBegGEAY4BmAGiAagAAgCWADQAAgCXADUAAgCYADYAAgCZADcABACaADgAGgBeAAIAmwA5AAQAnAA6ABsABQACAJ0AOwAEAJ4APAAcAAYABACfAD0AHQAHAAQAoAA+AB4ACAAEAKEARAAfAAkABACiAEUAIAAKAAIAowBGAAIApABHAAIApQBIAAIApgBJAAQApwBKACEACwAEAKgASwAlAAwABACpAEwAJgBiAAQAqgBNACcAXwAEAKsATgAoAA4ABACsAE8AKQAPAAQArQBQACoAEAAEAK4AUQArABEABAC0AFIALAASAAQAtQBTAC0AEwAEALYAVAAuABQABAC3AFUALwAVAAQAuABWADAAFgAEALkAVwAxABcABAC6AFgAMgAYAAIAuwBZAAIAvABaAAQAvQBbADMAGQAEAMYAawBnAGMABADHAGwAaABlAAQAyABtAGoAZgACAMwAbgACAOIA4QABAAMAmwC7AL0AAgABAL8AxAAAAAEAAgAVAC8AAQABABUAAQABADkAAgAFAJUArgAAALQAvQAaAMYAyAAkAMwAzAAnAOIA4gAoAAIAAQC+AMUAAAACAAUAlgCuAAAAtAC9ABkAxgDIACMAzADMACYA4gDiACcAAgAHAJoAmgAAAJwAnAABAJ4AogACAKcArgAHALQAugAPAL0AvQAWAMYAyAAXAAIAAgCVAJUAAAC+AMUAAQAAAAEAAAAKAB4ALAABbGF0bgAIAAQAAAAA//8AAQAAAAFrZXJuAAgAAAABAAAAAQAEAAIAAAABAAgAAQDqAAQAAAALACAALgA8AE4AYAB+AJgAqgC0ANIA4AADAIr/iACL/5oAjf+EAAMAiv+IAIv/mgCN/4QABACK/0kAi/+dAIz/zwCN/7IABAA//4gAQP+IAIT/XgCN/6wABwCE/5YAhv/PAIj/1gCJ/7kAi//cAIz/egCN/9YABgCE/7kAiP/VAIn/yACL/88AjP/dAI3/qwAEAIr/gQCL/7kAjP/HAI3/1QACAIr/pACL/88ABwA//6YAQP+mAIb/zwCI/88Aif/BAIz/iACN/7kAAwCK/5YAi/+PAI3/pAACAIr/wACL/88AAgADAD8AQAAAAIQAhAACAIYAjQAD';
var callAddFont = function () {
this.addFileToVFS('GE_SS_Two_Light-normal.ttf', font);
this.addFont('GE_SS_Two_Light-normal.ttf', 'GE_SS_Two_Light', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
