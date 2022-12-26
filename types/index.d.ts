/// <reference types="@types/jquery" />
/// <reference types="@types/jquery-deferred" />
import { Ref, ForwardRefRenderFunction } from 'react';

export type Locale =
  'en' |
  'ar' |
  'az' |
  'ca' |
  'cs' |
  'da' |
  'de' |
  'el' |
  'es' |
  'et' |
  'fr' |
  'he' |
  'is' |
  'it' |
  'ja' |
  'ko' |
  'lv' |
  'nb' |
  'nl' |
  'pl' |
  'pt' |
  'ro' |
  'ru' |
  'sk' |
  'sr' |
  'sv' |
  'tr' |
  'uk' |
  'vi' |
  'zhTW' |
  'zh';

export type LocalePluralize = (n: number) => string;

export interface LocaleTranslations {
  uploading?: string;
  loadingInfo?: string;
  errors?: {
    default?: string;
    baddata?: string;
    size?: string;
    upload?: string;
    user?: string;
    info?: string;
    image?: string;
    createGroup?: string;
    deleted?: string;
  };
  draghere?: string;
  file?: {
    one?: string;
    other?: string;
  };
  buttons?: {
    cancel?: string;
    remove?: string;
    choose?: {
      files?: {
        one?: string;
        other?: string;
      },
      images?: {
        one?: string;
        other?: string;
      }
    }
  };
  dialog?: {
    close?: string;
    openMenu?: string;
    done?: string;
    showFiles?: string;
    tabs?: {
      names?: {
        'empty-pubkey'?: string;
        preview?: string;
        file?: string;
        url?: string;
        camera?: string;
        facebook?: string;
        dropbox?: string;
        gdrive?: string;
        gphotos?: string;
        instagram?: string;
        vk?: string;
        evernote?: string;
        box?: string;
        onedrive?: string;
        flickr?: string;
        huddle?: string;
      };
      file?: {
        drag?: string;
        nodrop?: string;
        cloudsTip?: string;
        or?: string;
        button?: string;
        also?: string;
      };
      url?: {
        title?: string;
        line1?: string;
        line2?: string;
        input?: string;
        button?: string;
      };
      camera?: {
        title?: string;
        capture?: string;
        mirror?: string;
        startRecord?: string;
        stopRecord?: string;
        cancelRecord?: string;
        retry?: string;
        pleaseAllow?: {
          title?: string;
          text?: string;
        };
        notFound?: {
          title?: string;
          text?: string;
        }
      };
      preview?: {
        unknownName?: string;
        change?: string;
        back?: string;
        done?: string;
        unknown?: {
          title?: string;
          done?: string;
        };
        regular?: {
          title?: string;
          line1?: string;
          line2?: string;
        };
        image?: {
          title?: string;
          change?: string;
        };
        crop?: {
          title?: string;
          done?: string;
          free?: string;
        };
        video?: {
          title?: string;
          change?: string;
        };
        error?: {
          default?: {
            title?: string;
            text?: string;
            back?: string;
          };
          image?: {
            title?: string;
            text?: string;
            back?: string;
          };
          size?: {
            title?: string;
            text?: string;
          };
          loadImage?: {
            title?: string;
            text?: string;
          }
        };
        multiple?: {
          title?: string;
          question?: string;
          tooManyFiles?: string;
          tooFewFiles?: string;
          clear?: string;
          done?: string;
          file?: {
            preview?: string;
            remove?: string;
          }
        }
      }
    };
    footer?: {
      text?: string;
      link?: string;
    }
  };
  effects?: {
    captions?: {
      blur?: string;
      crop?: string;
      enhance?: string;
      flip?: string;
      grayscale?: string;
      invert?: string;
      mirror?: string;
      rotate?: string;
      sharp?: string;
    };
    apply?: string;
  };
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface OriginalImageInfo {
	height: number;
	width: number;
	geoLocation: GeoLocation | null;
	datetimeOriginal: string;
	format: string;
	colorMode: string;
	dpi: {
		"0": number;
		"1": number;
	} | null;
	orientation: number | null;
	sequence: boolean | null;
}

export interface AudioInfo {
	bitrate: number | null;
	codec: string | null;
	sampleRate: number | null;
	channels: string | null;
}

export interface OriginalVideoInfo {
	duration: number;
	format: string;
	bitrate: number;
	audio: AudioInfo | null;
	video: {
		height: number;
		width: number;
		frameRate: number;
		bitrate: number;
		codec: string;
	};
}

export interface MimeInfo {
	mime: string;
	type: string;
	subtype: string;
}

export interface OriginalContentInfo {
	mime?: MimeInfo;
	image?: OriginalImageInfo;
	video?: OriginalVideoInfo;
}

export type Metadata = Record<string, string>;

export type Uuid = string;

export interface SourceInfo {
  source: string;
  file: any;
}

export interface FileInfo {
  uuid: null | Uuid;
  name: null | string;
  size: null | number;
  isStored: null | boolean;
  isImage: null | boolean;
  originalImageInfo: null | OriginalImageInfo;
  originalVideoInfo: null | OriginalVideoInfo;
  originalContentInfo: null | OriginalContentInfo;
  mimeType: null | string;
  originalUrl: null | string;
  cdnUrl: null | string;
  cdnUrlModifiers: null | string;
  sourceInfo: null | SourceInfo;
  metadata: null | Metadata;
  crop?: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
}

export interface ProgressInfo {
  incompleteFileInfo: Partial<FileInfo>;
  progress: number;
  state: string;
  uploadProgress: number;
}

export type OnTabVisibilityCallback = (tab: string, shown: boolean) => void;

export interface Collection<T> {
  onAdd: JQuery.Callbacks;
  onRemove: JQuery.Callbacks;
  onSort: JQuery.Callbacks;
  onReplace: JQuery.Callbacks;
  __items: T[];

  add: (item: T) => JQuery.Callbacks | undefined;
  remove: (item: T) => JQuery.Callbacks | undefined;
  clear: () => JQuery.Callbacks[];
  replace: (oldItem: T, newItem: T) => JQuery.Callbacks | undefined;
  sort: (comparator: (a: T, b: T) => boolean) => JQuery.Callbacks;
  get: (index: number) => T;
  length: () => number;
}

export interface UniqCollection<T> extends Collection<T> {
  add: (item: T) => JQuery.Callbacks | undefined;
}
export interface CollectionOfPromises<T> extends UniqCollection<JQuery.Deferred<T>> {
  anyDoneList: JQuery.Callbacks;
  anyFailList: JQuery.Callbacks;
  anyProgressList: JQuery.Callbacks;

  onAdd: JQuery.Callbacks;
  onRemove: JQuery.Callbacks;
  onReplace: JQuery.Callbacks;
  onSort: JQuery.Callbacks;

  onAnyDone: (cb: () => void) => void;
  onAnyFail: (cb: () => void) => void;
  onAnyProgress: (cb: () => void) => void;
  lastProgresses: () => ProgressInfo[];

  autoThen: unknown;
}

export interface DialogApi {
  addFiles(type: string, files: any[]): void;
  addFiles(files: Array<JQuery.Deferred<FileInfo>>): void;
  switchTab(tab: string): void;
  getFileColl(): CollectionOfPromises<FileInfo>;
  hideTab(tab: string): void;
  showTab(tab: string): void;
  isTabVisible(tab: string): boolean;
  onTabVisibility(callback: OnTabVisibilityCallback): void;
}

export interface LocaleSettings {
  // developer hooks
  locale?: Locale;
  localePluralize?: LocalePluralize;
  localeTranslations?: LocaleTranslations;
}

export interface Settings extends LocaleSettings {
  // widget & dialog settings
  systemDialog?: boolean;
  crop?: string;
  previewStep?: boolean;
  imagesOnly?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  multipleMax?: number;
  multipleMin?: number;
  multipleMaxStrict?: boolean;
  imageShrink?: string;
  pathValue?: boolean;
  tabs?: string;
  preferredTypes?: string;
  inputAcceptTypes?: string; // '' means default, null means "disable accept"
  // upload settings
  doNotStore?: boolean;
  publicKey: string | null;
  secureSignature?: string;
  secureExpire?: number;
  pusherKey?: string;
  cdnBase?: string;
  urlBase?: string;
  socialBase?: string;
  previewProxy?: string | null;
  previewUrlCallback?:
    | ((originalUrl: string, fileInfo: FileInfo) => string)
    | null;
  metadataCallback?: () => Metadata;
  metadata?: Metadata;
  // fine tuning
  imagePreviewMaxSize?: number;
  multipartMinSize?: number;
  multipartPartSize?: number;
  multipartMinLastPartSize?: number;
  multipartConcurrency?: number;
  multipartMaxAttempts?: number;
  parallelDirectUploads?: number;
  passWindowOpen?: boolean;
  // camera recording
  audioBitsPerSecond?: number | null;
  videoBitsPerSecond?: number | null;
  // maintain settings
  scriptBase?: string;
  debugUploads?: boolean;
  integration?: string;
  // effects tab
  effects?: string | string[];

  remoteTabSessionKey?: string;
}

export interface WidgetAPI {
  openDialog: (tab?: string | null | Settings) => void;
  reloadInfo: () => void;
  getInput: () => HTMLInputElement;
  value: (value?: null | string[] | JQuery.Deferred<FileInfo> | JQuery.Deferred<FileGroup>) => void;
}

export interface FileUpload extends JQuery.Deferred<FileInfo> {
  cancel: () => FileUpload;
}

/**
 * The result of uploading multiple files to upload care is a file group.
 *
 * The react upload care widget does not (yet) define this type.
 *
 * This export type is reverse engineered from stepping into the debugger.
 */
export interface FileGroup {
  cdnUrl: string;
  count: number;
  isImage: boolean;
  isStored: boolean;
  name: string;
  size: number;
  uuid: string;
}

export interface FileGroupUpload extends JQuery.Deferred<FileGroup> {}

export interface FilesUpload {
  promise: () => FileGroupUpload;
  files: () => FileUpload[];
}

export interface WidgetProps extends Settings {
  value?: string;
  onChange?: (fileInfo: FileInfo) => void;
  onFileSelect?: (fileInfo: FileUpload | FilesUpload | null) => void;
  onDialogOpen?: (dialog: DialogApi) => void;
  onDialogClose?: (info: FileUpload | FilesUpload | null) => void;
  onTabChange?: (tabName: string) => void;
  customTabs?: { [key: string]: CustomTabConstructor };
  validators?: Validator[];
  tabsCss?: string;
  preloader?: JSX.Element | string | number | null;
  ref?: Ref<WidgetAPI>;
}

export type CustomTabConstructor = (
  container: JQuery,
  button: JQuery,
  dialogApi: DialogApi,
  settings: Settings,
  name: string,
  uploadcare: any
) => void;

export type Validator = (fileInfo: FileInfo) => void;

export const Widget: ForwardRefRenderFunction<LocaleSettings, WidgetProps>;

export type PanelAPI = DialogApi;

export interface PanelProps extends Settings {
  value?: string[];
  onChange?: (files: FileUpload[]) => void;
  onTabChange?: (tabName: string) => void;
  onProgress?: (lastProgresses: ProgressInfo[]) => void;
  customTabs?: { [key: string]: CustomTabConstructor };
  validators?: Validator[];
  tabsCss?: string;
  preloader?: JSX.Element | string | number | null;
  ref?: Ref<PanelAPI>;
  multiple?: boolean;
}

export const Panel: ForwardRefRenderFunction<LocaleSettings, PanelProps>;
