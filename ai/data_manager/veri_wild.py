import os
import os.path as osp


class VeRI_Wild(object):
    """
    VeRI-Wild

    @inproceedings{lou2019veri,
    title={VERI-Wild: A Large Dataset and a New Method for Vehicle Re-Identification in the Wild},
    author={Lou, Yihang and Bai, Yan and Liu, Jun and Wang, Shiqi and Duan, Ling-Yu},
    booktitle={Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition},
    year={2019}
    }

    vehicle_info: Model;Type;Color
    images: 416,314
    Identities: 40,671
    Cameras: 174
    Views: Unconstrained

    IDs/Images
    Train: 30,671/277,797
    Probe: 10,000/10,000
    Gallery: 10,000/128,517

    three subsets(IDs/Images)
    Small: 3,000/41,816
    Medium: 5,000/69,389
    Large: 10,000/138,517
    """

    root = '/home/ml/de/dataset/VERI-Wild'
    train_name_path = osp.join(root, 'train_test_split/train_list_info.txt')
    test_3000_path = osp.join(root, 'train_test_split/test_3000_info.txt')
    test_3000_query_path = osp.join(root, 'train_test_split/test_3000_query_info.txt')
    test_5000_path = osp.join(root, 'train_test_split/test_5000_info.txt')
    test_5000_query_path = osp.join(root, 'train_test_split/test_5000_query_info.txt')
    test_10000_path = osp.join(root, 'train_test_split/test_10000_info.txt')
    test_10000_query_path = osp.join(root, 'train_test_split/test_10000_query_info.txt')
    vehicle_info_path = osp.join(root, 'train_test_split/vehicle_info.txt')

    def __init__(self, root):
        self._check_before_run()
        self.train, self.train_vehicle_nums, num_imgs = self._image_process(self.train_name_path)
        self.test_3000_query, query_vehicle_nums, num_imgs = self._image_process(self.test_3000_query_path)
        self.test_3000_gallery, gallery_vehicle_nums, num_imgs = self._image_process(self.test_3000_path)
        self.test_5000_query, query_vehicle_nums, num_imgs = self._image_process(self.test_5000_query_path)
        self.test_5000_gallery, gallery_vehicle_nums, num_imgs = self._image_process(self.test_5000_path)
        self.test_10000_query, query_vehicle_nums, num_imgs = self._image_process(self.test_10000_query_path)
        self.test_10000_gallery, gallery_vehicle_nums, num_imgs = self._image_process(self.test_10000_path)

    def _check_before_run(self):
        """Check if all files are available before going deeper"""
        if not osp.exists(self.root):
            raise RuntimeError("'{}' is not available".format(self.root))
        if not osp.exists(self.train_name_path):
            raise RuntimeError("'{}' is not available".format(self.train_name_path))
        if not osp.exists(self.test_3000_path):
            raise RuntimeError("'{}' is not available".format(self.test_3000_path))
        if not osp.exists(self.test_3000_query_path):
            raise RuntimeError("'{}' is not available".format(self.test_3000_query_path))
        if not osp.exists(self.test_5000_path):
            raise RuntimeError("'{}' is not available".format(self.test_5000_path))
        if not osp.exists(self.test_5000_query_path):
            raise RuntimeError("'{}' is not available".format(self.test_5000_query_path))
        if not osp.exists(self.test_10000_path):
            raise RuntimeError("'{}' is not available".format(self.test_10000_path))
        if not osp.exists(self.test_10000_query_path):
            raise RuntimeError("'{}' is not available".format(self.test_10000_query_path))
        if not osp.exists(self.vehicle_info_path):
            raise RuntimeError("'{}' is not available".format(self.vehicle_info_path))

    def _image_process(self, fpath, relabel=True):
        dataset = []
        vehicle_info = []
        with open(fpath, 'r') as f:
            for line in f:
                new_line = line.rstrip()
                line_temp = new_line.split(';')
                vehicle_info.append(line_temp)
        vid_container = set()
        for item in vehicle_info:
            img_temp = item[0].split('/')
            vid = int(img_temp[0])
            if vid == -1: continue  # junk images are just ignored
            vid_container.add(vid)
        vid2label = {vid: label for label, vid in enumerate(vid_container)}
        for item in vehicle_info:
            img_temp = item[0].split('/')
            img_path = os.path.join(self.root, 'images', img_temp[0], img_temp[1] + '.jpg')
            label = [item[2], item[3], item[4]]  # Model;Type;Color
            # , label
            vid = int(img_temp[0])  # Vehicle ID
            cid = int(item[1])  # Camera ID
            if vid == -1:
                continue
            if relabel:
                vid = vid2label[vid]
            dataset.append((img_path, vid, cid))  # image path
        Vehicle_nums = len(vid_container)
        num_imgs = len(dataset)
        # print('train Vehicle ids ',Vehicle_nums)
        return dataset, Vehicle_nums, num_imgs